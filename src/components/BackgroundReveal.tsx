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

    const pointerRadius = 18;
    const pointerFeather = 105;
    const minimumDotScale = 0.08;

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#111';
      const time = (now - start) / 1000;

      // Clean up finished ripples
      ripples = ripples.filter((r) => {
        const age = (now - r.born) / 1000;
        return age * r.speed <= r.maxRadius;
      });

      context.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. Dynamic in-place breathing (dots smoothly increase and decrease size)
        const pulse1 = Math.sin(time * dot.pulseSpeed + dot.pulsePhase);
        const pulse2 = Math.cos(time * dot.secondarySpeed + dot.secondaryPhase);
        const pulseScale = 1.0 + 0.32 * pulse1 + 0.16 * pulse2;

        // 2. Feathered white circle on mouse hover (dots decrease to minimum size within radius)
        let cursorInfluence = 0;
        if (pointer) {
          const distanceToPointer = Math.hypot(
            dot.originX - pointer.x,
            dot.originY - pointer.y,
          );
          const featherProgress = Math.min(
            1,
            Math.max(
              0,
              (distanceToPointer - pointerRadius) / pointerFeather,
            ),
          );
          const easedFeather =
            featherProgress * featherProgress * (3 - 2 * featherProgress);
          cursorInfluence = 1 - easedFeather;
        }

        // Dots shrink smoothly toward minimum size inside the cursor radius
        let scale =
          pulseScale + (minimumDotScale - pulseScale) * cursorInfluence;

        // Base position is strictly static
        let posX = dot.originX;
        let posY = dot.originY;

        // 3. Subtle tactile click shockwave motion
        for (let r = 0; r < ripples.length; r++) {
          const ripple = ripples[r];
          const age = (now - ripple.born) / 1000;
          const currentRadius = age * ripple.speed;
          const dx = dot.originX - ripple.x;
          const dy = dot.originY - ripple.y;
          const rDist = Math.hypot(dx, dy);
          const rDiff = rDist - currentRadius;
          const waveBand = 65;

          if (Math.abs(rDiff) < waveBand) {
            const wavePhase = (rDiff / waveBand) * (Math.PI / 2);
            const waveMag = Math.cos(wavePhase);
            const life = Math.max(0, 1 - currentRadius / ripple.maxRadius);
            const effect = waveMag * life * ripple.strength;

            // Subtle, gentle outward displacement (soft max ~5.5px)
            const rAngle = Math.atan2(dy, dx);
            const push = effect * 6.5;
            posX += Math.cos(rAngle) * push;
            posY += Math.sin(rAngle) * push;

            // Subtle temporary scale modulation
            scale += effect * 0.22;
          }
        }

        const radius = Math.max(0, dot.base * scale);
        if (radius < 0.18) continue;

        context.moveTo(posX + radius, posY);
        context.arc(posX, posY, radius, 0, Math.PI * 2);
      }

      context.fill();

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

          dots.push({
            originX: (x / offscreen.width) * width,
            originY: (y / offscreen.height) * height,
            base,
            pulsePhase: getDotNoise(x, y, 1) * Math.PI * 2,
            pulseSpeed: 1.1 + getDotNoise(x, y, 2) * 1.3,
            secondaryPhase: getDotNoise(x, y, 3) * Math.PI * 2,
            secondarySpeed: 0.5 + getDotNoise(x, y, 4) * 0.8,
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
        ripples.push({
          x,
          y,
          born: performance.now(),
          speed: 380,
          maxRadius: 520,
          strength: 0.85,
        });
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
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerleave', onPointerLeave);
    reducedMotion.addEventListener('change', setup);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
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
