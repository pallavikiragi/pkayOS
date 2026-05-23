/** Fine dot-like ramp (lighter = smaller marks) */
const CHARS = ' .·:;+=xX$&';

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function imageToAscii(img: HTMLImageElement, cols = 200): string {
  const aspect = img.height / img.width;
  const rows = Math.max(1, Math.floor(cols * aspect * 0.48));

  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.drawImage(img, 0, 0, cols, rows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const lines: string[] = [];
  for (let y = 0; y < rows; y += 1) {
    let line = '';
    for (let x = 0; x < cols; x += 1) {
      const i = (y * cols + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const charIndex = Math.min(
        CHARS.length - 1,
        Math.floor(lum * CHARS.length),
      );
      line += CHARS[CHARS.length - 1 - charIndex];
    }
    lines.push(line);
  }

  return lines.join('\n');
}
