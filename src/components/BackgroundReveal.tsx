import { useEffect, useRef } from 'react';
import backgroundImage from '../assets/halftone-background.png';

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

  if (base >= 3.2) {
    const i = Math.floor(u * ASCII_DENSE.length);
    return ASCII_DENSE[i];
  }
  if (base < 1.6) {
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

    const source = new Image();
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
    let dots: {
      originX: number;
      originY: number;
      gridX: number;
      gridY: number;
      base: number;
      pulsePhase: number;
      pulseSpeed: number;
      secondaryPhase: number;
      secondarySpeed: number;
    }[] = [];
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
      asciiQueue.length = 0;

      // Clean up finished ripples
      ripples = ripples.filter((r) => {
        const age = (now - r.born) / 1000;
        return age * r.speed <= r.maxRadius + r.waveWidth;
      });

      context.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

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

        // 3. Subtle click reactivity within a small radius: gentle size dip + subtle traveling wave
        for (let r = 0; r < ripples.length; r++) {
          const ripple = ripples[r];
          const age = (now - ripple.born) / 1000;
          const currentRadius = age * ripple.speed;
          const dx = dot.originX - ripple.x;
          const dy = dot.originY - ripple.y;
          const dist = Math.hypot(dx, dy);

          // Subtle immediate size dip around click location (wider 85px radius)
          const impactDuration = 0.38;
          if (age < impactDuration) {
            const impactRadius = 85;
            if (dist < impactRadius) {
              const distFactor = 1 - dist / impactRadius;
              const timeFactor = Math.sin(
                (1 - age / impactDuration) * (Math.PI / 2),
              );
              // Very gentle, non-stark size decrease upon click
              scale -= distFactor * timeFactor * 0.22;
            }
          }

          // Subtle single wave confined within wider radius
          const delta = dist - currentRadius;
          const halfBand = ripple.waveWidth;

          if (Math.abs(delta) < halfBand && currentRadius <= ripple.maxRadius) {
            const norm = delta / halfBand;
            const envelope = Math.cos(norm * (Math.PI / 2)) ** 2;
            const waveCycle = -Math.sin(norm * Math.PI);
            const life = Math.max(0, 1 - currentRadius / ripple.maxRadius);

            // Gentle size modulation: subtly decreases then increases dot size
            scale += waveCycle * envelope * life * ripple.strength * 0.40;
          }
        }

        // Sparser ASCII sampling: place glyphs every 3rd grid step so characters have generous breathing room
        const isAsciiCell = dot.gridX % 3 === 0 && dot.gridY % 3 === 0;

        // Inside hover sphere: convert spaced dot into randomized animating ASCII character
        if (isAsciiCell && asciiInfluence > 0) {
          const char = getAsciiGlyph(dot.base, dot.pulsePhase, animTime, i);
          const font =
            dot.base >= 3.2
              ? FONT_LARGE
              : dot.base < 1.6
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
          const radius = Math.max(
            0,
            dot.base * Math.max(minimumDotScale, Math.min(1.45, circleScale)),
          );
          if (radius >= 0.25) {
            context.moveTo(posX + radius, posY);
            context.arc(posX, posY, radius, 0, Math.PI * 2);
          }
        }
      }

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
          context.globalAlpha = item.alpha;
          context.fillText(item.char, item.x, item.y);
        }

        context.globalAlpha = 1;
      }

      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const setup = () => {
      if (!source.complete || source.naturalWidth === 0) return;

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
      offscreenContext.fillStyle = '#fff';
      offscreenContext.fillRect(0, 0, offscreen.width, offscreen.height);

      const scale = Math.max(
        offscreen.width / source.naturalWidth,
        offscreen.height / source.naturalHeight,
      );
      const imageWidth = source.naturalWidth * scale;
      const imageHeight = source.naturalHeight * scale;
      offscreenContext.drawImage(
        source,
        (offscreen.width - imageWidth) / 2,
        (offscreen.height - imageHeight) / 2,
        imageWidth,
        imageHeight,
      );

      const pixels = offscreenContext.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      ).data;
      const spacing = 3;
      dots = [];

      for (let y = 0; y < offscreen.height; y += spacing) {
        for (let x = 0; x < offscreen.width; x += spacing) {
          const index = (y * offscreen.width + x) * 4;
          const brightness =
            (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
          const base = (1 - brightness / 255) * 5.2;

          // Retain dots with graphic density
          if (base < 0.25) continue;

          const gridX = Math.round(x / spacing);
          const gridY = Math.round(y / spacing);

          dots.push({
            originX: (x / offscreen.width) * width,
            originY: (y / offscreen.height) * height,
            gridX,
            gridY,
            base,
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
        ripples = [
          {
            x,
            y,
            born: performance.now(),
            speed: 280,
            maxRadius: 320,
            strength: 1.0,
            waveWidth: 56,
          },
        ];
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

    source.onload = setup;
    source.onerror = () => {
      console.error('Unable to load the halftone background source image.');
    };
    source.src = backgroundImage;
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
      source.onload = null;
      source.onerror = null;
    };
  }, []);

  return (
    <div className="background-reveal" aria-hidden="true">
      <canvas ref={canvasRef} className="background-reveal__canvas" />
    </div>
  );
}
