import { useEffect, useRef } from 'react';
import backgroundImage1 from '../assets/halftone-background.png';
import backgroundImage2 from '../assets/halftone-background-2.png';

function getDotNoise(x: number, y: number, salt: number) {
  let value = Math.imul(x ^ salt, 0x45d9f3b);
  value = Math.imul(value ^ y, 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value ^= value >>> 16;
  return (value >>> 0) / 0x100000000;
}

interface Ripple {
  x: number;
  y: number;
  born: number;
  speed: number;
  maxRadius: number;
  strength: number;
  waveWidth: number;
}

interface HalftoneDot {
  originX: number;
  originY: number;
  gridX: number;
  gridY: number;
  base1: number;
  base2: number;
  morphOffset: number;
  pulsePhase: number;
  pulseSpeed: number;
  secondaryPhase: number;
  secondarySpeed: number;
}

const ASCII_DENSE = [
  '@', '#', '$', '%', '&', '8', 'B', 'W', 'M', '0', 'Q', 'X', 'Z',
];
const ASCII_MID = [
  '*', '+', '=', '×', '÷', '?', '!', '7', '1', 'o', 'x', '<', '>', '/', '\\', '|', '[', ']', '{', '}',
];
const ASCII_LIGHT = [
  ':', ';', '-', '~', '^', '·', '•', '°', '.', '\'', '`',
];

const FONT_SMALL = '600 8px "IBM Plex Mono", "Courier New", monospace';
const FONT_MEDIUM = '600 9.5px "IBM Plex Mono", "Courier New", monospace';
const FONT_LARGE = '600 11.5px "IBM Plex Mono", "Courier New", monospace';

const HOLD_SECONDS = 7;
const TRANSITION_SECONDS = 2.2;
const MORPH_WINDOW = 0.55;
const MAX_BASE_DOT_RADIUS = 3.2;
const MAX_RENDER_DOT_RADIUS = 4.8;

function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Returns a cyclic [0, 1] blend factor that holds each background in place
 * before smoothly morphing to the other.
 */
function getBackgroundBlend(time: number, canCycle: boolean): number {
  if (!canCycle) return 0;

  const halfCycle = HOLD_SECONDS + TRANSITION_SECONDS;
  const fullCycle = halfCycle * 2;
  const phase = time % fullCycle;

  if (phase < HOLD_SECONDS) return 0;
  if (phase < halfCycle) return (phase - HOLD_SECONDS) / TRANSITION_SECONDS;
  if (phase < halfCycle + HOLD_SECONDS) return 1;
  return 1 - (phase - (halfCycle + HOLD_SECONDS)) / TRANSITION_SECONDS;
}

function sampleImagePixels(
  image: HTMLImageElement,
  offscreen: HTMLCanvasElement,
  offscreenContext: CanvasRenderingContext2D,
  fitMode: 'cover' | 'contain' = 'cover',
  scaleFactor = 1,
): Uint8ClampedArray {
  offscreenContext.fillStyle = '#fff';
  offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);

  const baseScale =
    fitMode === 'contain'
      ? Math.min(
          offscreen.width / image.naturalWidth,
          offscreen.height / image.naturalHeight,
        )
      : Math.max(
          offscreen.width / image.naturalWidth,
          offscreen.height / image.naturalHeight,
        );
  const scale = baseScale * scaleFactor;
  const imageWidth = image.naturalWidth * scale;
  const imageHeight = image.naturalHeight * scale;
  offscreenContext.drawImage(
    image,
    (offscreen.width - imageWidth) / 2,
    (offscreen.height - imageHeight) / 2,
    imageWidth,
    imageHeight,
  );

  return offscreenContext.getImageData(
    0,
    0,
    offscreen.width,
    offscreen.height,
  ).data;
}

function getAsciiGlyph(
  base: number,
  phase: number,
  time: number,
  index: number,
): string {
  // 12 updates per second with staggered phase offsets per dot
  const tick = Math.floor(time * 12 + phase * 3 + index * 0.41);
  const hash = Math.imul(tick ^ (index * 2654435761), 0x45d9f3b);
  const u = ((hash >>> 0) % 1000) / 1000;

  if (base >= 2.1) {
    const i = Math.floor(u * ASCII_DENSE.length);
    return ASCII_DENSE[i];
  }
  if (base < 1.0) {
    const i = Math.floor(u * ASCII_LIGHT.length);
    return ASCII_LIGHT[i];
  }
  const i = Math.floor(u * ASCII_MID.length);
  return ASCII_MID[i];
}

export function BackgroundReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Unable to create the animated halftone canvas context.');
      return;
    }

    const source1 = new Image();
    const source2 = new Image();
    const offscreen = document.createElement('canvas');
    const offscreenContext = offscreen.getContext('2d', {
      willReadFrequently: true,
    });
    if (!offscreenContext) {
      console.error('Unable to create the halftone source canvas context.');
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const start = performance.now();
    let dots: HalftoneDot[] = [];
    let hasSecondBg = false;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let pointer: { x: number; y: number } | null = null;
    let ripples: Ripple[] = [];

    const asciiQueue: {
      char: string;
      x: number;
      y: number;
      alpha: number;
      font: string;
    }[] = [];

    const sphereRadius = 130;
    const sphereFeather = 40;
    const minimumDotScale = 0.08;

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#111';
      const time = (now - start) / 1000;
      const animTime = reducedMotion.matches ? 0 : time;
      const blend = getBackgroundBlend(
        animTime,
        hasSecondBg && !reducedMotion.matches,
      );
      // Soften the denser second background while preserving the first background's look
      const bgAlpha = 1 - blend * 0.42;
      asciiQueue.length = 0;

      // Clean up finished ripples
      ripples = ripples.filter((r) => {
        const age = (now - r.born) / 1000;
        return age * r.speed <= r.maxRadius + r.waveWidth;
      });

      context.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (blend === 0 && dot.base1 === 0) continue;
        if (blend === 1 && dot.base2 === 0) continue;

        let currentBase: number;
        if (blend === 0) {
          currentBase = dot.base1;
        } else if (blend === 1) {
          currentBase = dot.base2;
        } else {
          const localProgress = smoothstep(
            (blend - dot.morphOffset) / MORPH_WINDOW,
          );
          currentBase = dot.base1 + (dot.base2 - dot.base1) * localProgress;
        }

        if (currentBase < 0.08) continue;

        // 1. Dynamic in-place breathing (dots smoothly increase and decrease size)
        const pulse1 = Math.sin(time * dot.pulseSpeed + dot.pulsePhase);
        const pulse2 = Math.cos(time * dot.secondarySpeed + dot.secondaryPhase);
        const pulseScale = 1.0 + 0.35 * pulse1 + 0.16 * pulse2;

        // 2. Cursor hover sphere: converts dots into ASCII characters
        let asciiInfluence = 0;
        if (pointer) {
          const distanceToPointer = Math.hypot(
            dot.originX - pointer.x,
            dot.originY - pointer.y,
          );
          if (distanceToPointer < sphereRadius) {
            asciiInfluence = Math.min(
              1,
              Math.max(0, (sphereRadius - distanceToPointer) / sphereFeather),
            );
          }
        }

        let scale = pulseScale;

        // Base position remains static
        const posX = dot.originX;
        const posY = dot.originY;

        // 3. Dynamic click reactivity: pronounced dip to small followed by powerful surge to big
        for (let r = 0; r < ripples.length; r++) {
          const ripple = ripples[r];
          const age = (now - ripple.born) / 1000;
          const currentRadius = age * ripple.speed;
          const dx = dot.originX - ripple.x;
          const dy = dot.originY - ripple.y;
          const dist = Math.hypot(dx, dy);

          // Immediate size compression around click location
          const impactDuration = 0.42;
          if (age < impactDuration) {
            const impactRadius = 135;
            if (dist < impactRadius) {
              const distFactor = 1 - dist / impactRadius;
              const progress = age / impactDuration;
              const dipPhase = Math.sin(progress * Math.PI);
              scale -= distFactor * dipPhase * 0.55;
            }
          }

          // Traveling wave: distinctly pulls dots small then swells them big
          const delta = dist - currentRadius;
          const halfBand = ripple.waveWidth;

          if (Math.abs(delta) < halfBand && currentRadius <= ripple.maxRadius) {
            const norm = delta / halfBand;
            const envelope = Math.cos(norm * (Math.PI / 2)) ** 2;
            const waveCycle = -Math.sin(norm * Math.PI);
            const life = Math.pow(
              Math.max(0, 1 - currentRadius / ripple.maxRadius),
              0.65,
            );

            // Distinct small-to-big transition: dip when norm > 0, large crest when norm < 0
            const waveAmplitude = waveCycle >= 0 ? 1.45 : 0.85;
            scale += waveCycle * waveAmplitude * envelope * life * ripple.strength;
          }
        }

        // Sparser ASCII sampling: place glyphs every 3rd grid step so characters have generous breathing room
        const isAsciiCell = dot.gridX % 3 === 0 && dot.gridY % 3 === 0;

        // Inside hover sphere: convert spaced dot into randomized animating ASCII character
        if (isAsciiCell && asciiInfluence > 0) {
          const effectiveBase =
            currentBase * Math.max(0.4, Math.min(1.8, scale));
          const char = getAsciiGlyph(effectiveBase, dot.pulsePhase, animTime, i);
          const font =
            effectiveBase >= 2.1
              ? FONT_LARGE
              : effectiveBase < 1.0
                ? FONT_SMALL
                : FONT_MEDIUM;
          asciiQueue.push({
            char,
            x: posX,
            y: posY,
            alpha: asciiInfluence,
            font,
          });
        }

        // Draw regular circle dot outside or transitioning into hover sphere
        if (asciiInfluence < 0.95) {
          const circleScale = scale * (1 - asciiInfluence);
          const radius = Math.min(
            MAX_RENDER_DOT_RADIUS,
            Math.max(
              0,
              currentBase *
                Math.max(minimumDotScale, Math.min(1.8, circleScale)),
            ),
          );
          if (radius >= 0.25) {
            context.moveTo(posX + radius, posY);
            context.arc(posX, posY, radius, 0, Math.PI * 2);
          }
        }
      }

      context.globalAlpha = bgAlpha;
      context.fill();

      // Render animated ASCII characters inside cursor hover sphere
      if (asciiQueue.length > 0) {
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        let activeFont = '';

        for (let j = 0; j < asciiQueue.length; j++) {
          const item = asciiQueue[j];
          if (activeFont !== item.font) {
            context.font = item.font;
            activeFont = item.font;
          }
          context.globalAlpha = item.alpha * bgAlpha;
          context.fillText(item.char, item.x, item.y);
        }
      }

      context.globalAlpha = 1;

      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const setup = () => {
      if (!source1.complete || source1.naturalWidth === 0) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      offscreen.width = 800;
      offscreen.height = Math.max(
        1,
        Math.round((offscreen.width * height) / width),
      );

      const pixels1 = sampleImagePixels(
        source1,
        offscreen,
        offscreenContext,
        'cover',
        1,
      );
      hasSecondBg = source2.complete && source2.naturalWidth > 0;
      const pixels2 = hasSecondBg
        ? sampleImagePixels(source2, offscreen, offscreenContext, 'contain', 0.8)
        : null;

      const spacing = 3;
      const maxGridX = Math.max(1, Math.round(offscreen.width / spacing));
      dots = [];

      for (let y = 0; y < offscreen.height; y += spacing) {
        for (let x = 0; x < offscreen.width; x += spacing) {
          const index = (y * offscreen.width + x) * 4;
          const brightness1 =
            (pixels1[index] + pixels1[index + 1] + pixels1[index + 2]) / 3;
          const rawBase1 = (1 - brightness1 / 255) * MAX_BASE_DOT_RADIUS;
          const base1 = rawBase1 >= 0.25 ? rawBase1 : 0;

          let base2 = 0;
          if (pixels2) {
            const brightness2 =
              (pixels2[index] + pixels2[index + 1] + pixels2[index + 2]) / 3;
            const rawBase2 = (1 - brightness2 / 255) * MAX_BASE_DOT_RADIUS;
            base2 = rawBase2 >= 0.25 ? rawBase2 : 0;
          }

          // Retain cells that have graphic density in at least one background
          if (base1 === 0 && base2 === 0) continue;

          const gridX = Math.round(x / spacing);
          const gridY = Math.round(y / spacing);
          // Stagger dot morph across a diagonal sweep + subtle noise so transitions dissolve organically
          const morphOffset =
            (gridX / maxGridX) * 0.27 + getDotNoise(x, y, 5) * 0.18;

          dots.push({
            originX: (x / offscreen.width) * width,
            originY: (y / offscreen.height) * height,
            gridX,
            gridY,
            base1,
            base2,
            morphOffset,
            pulsePhase: getDotNoise(x, y, 1) * Math.PI * 2,
            pulseSpeed: 0.45 + getDotNoise(x, y, 2) * 0.65,
            secondaryPhase: getDotNoise(x, y, 3) * Math.PI * 2,
            secondarySpeed: 0.2 + getDotNoise(x, y, 4) * 0.4,
          });
        }
      }

      cancelAnimationFrame(frameId);
      draw(performance.now());
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
          ? { x, y }
          : null;

      if (reducedMotion.matches && !document.hidden) {
        draw(performance.now());
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const dynamicMaxRadius = Math.max(720, Math.min(width, height) * 0.85);
        const newRipple: Ripple = {
          x,
          y,
          born: performance.now(),
          speed: 400,
          maxRadius: dynamicMaxRadius,
          strength: 1.0,
          waveWidth: 80,
        };
        ripples = [...ripples.slice(-4), newRipple];
        if (reducedMotion.matches && !document.hidden) {
          draw(performance.now());
        }
      }
    };

    const onPointerLeave = () => {
      pointer = null;
      if (reducedMotion.matches && !document.hidden) {
        draw(performance.now());
      }
    };

    const resizeObserver = new ResizeObserver(setup);

    source1.onload = setup;
    source1.onerror = () => {
      console.error('Unable to load the halftone background source image.');
    };
    source2.onload = setup;
    source2.onerror = () => {
      console.error('Unable to load the secondary halftone background image.');
    };
    source1.src = backgroundImage1;
    source2.src = backgroundImage2;
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown, { capture: true });
    window.addEventListener('pointerleave', onPointerLeave);
    reducedMotion.addEventListener('change', setup);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('pointerleave', onPointerLeave);
      reducedMotion.removeEventListener('change', setup);
      source1.onload = null;
      source1.onerror = null;
      source2.onload = null;
      source2.onerror = null;
    };
  }, []);

  return (
    <div className="background-reveal" aria-hidden="true">
      <canvas ref={canvasRef} className="background-reveal__canvas" />
    </div>
  );
}
