import { useEffect, useMemo, useState } from 'react';
import { SLIDESHOW_IMAGES } from '../data/content';
import type { BackgroundEffects } from '../types/background';
import { imageToAscii, loadImage } from '../utils/imageToAscii';

interface BackgroundSlideshowProps {
  effects: BackgroundEffects;
}

export function BackgroundSlideshow({ effects }: BackgroundSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [asciiArt, setAsciiArt] = useState('');

  const currentSrc = SLIDESHOW_IMAGES[index];

  const slideFilter = useMemo(
    () =>
      `saturate(${effects.saturation}%) contrast(${effects.contrast}%) brightness(${effects.brightness}%)`,
    [effects.saturation, effects.contrast, effects.brightness],
  );

  const imageOpacity = effects.intensity / 100;
  const asciiCols = 200 + Math.round((effects.asciiMix / 100) * 40);

  // Preload images
  useEffect(() => {
    SLIDESHOW_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDESHOW_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const buildAscii = async () => {
      if (effects.asciiMix < 2) {
        setAsciiArt('');
        return;
      }
      try {
        const img = await loadImage(currentSrc);
        if (cancelled) return;
        setAsciiArt(imageToAscii(img, asciiCols));
      } catch {
        if (!cancelled) setAsciiArt('');
      }
    };

    buildAscii();
    return () => {
      cancelled = true;
    };
  }, [currentSrc, effects.asciiMix, asciiCols]);

  return (
    <div className="slideshow" aria-hidden>
      {SLIDESHOW_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`slideshow__slide ${i === index ? 'slideshow__slide--active' : ''}`}
          style={{
            backgroundImage: `url(${src})`,
            filter: slideFilter,
            opacity: i === index ? imageOpacity : 0,
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}

      {asciiArt && effects.asciiMix > 0 && (
        <pre
          className="slideshow__ascii"
          style={{
            opacity: effects.asciiMix / 100,
            fontSize: `clamp(3px, ${(4.2 - effects.asciiMix / 35).toFixed(2)}vw, 7px)`,
            zIndex: 2,
          }}
          aria-hidden
        >
          {asciiArt}
        </pre>
      )}

      <div
        className="slideshow__grain"
        style={{ 
          opacity: 0.04 + (100 - effects.intensity) * 0.002,
          zIndex: 3 
        }}
      />
    </div>
  );
}
