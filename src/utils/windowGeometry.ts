import type { WindowKind } from '../types';

export type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const CHROME = 50; // menu + footer

export function getViewportBounds() {
  return {
    vw: window.innerWidth,
    vh: window.innerHeight,
    maxW: window.innerWidth - 24,
    maxH: window.innerHeight - CHROME,
  };
}

export function getDefaultSize(kind: WindowKind): { width: number; height: number } {
  const { maxW, maxH } = getViewportBounds();

  switch (kind) {
    case 'project':
      return {
        width: Math.round(Math.min(maxW * 0.82, maxW)),
        height: Math.round(Math.min(maxH * 0.78, maxH)),
      };
    case 'folder':
      return {
        width: Math.round(Math.min(maxW * 0.62, 820)),
        height: Math.round(Math.min(maxH * 0.72, 620)),
      };
    case 'about':
      return { width: 420, height: 400 };
    case 'trash':
      return { width: 360, height: 320 };
    default:
      return { width: 400, height: 380 };
  }
}

export function getMinSize(kind: WindowKind): { width: number; height: number } {
  switch (kind) {
    case 'project':
      return { width: 420, height: 320 };
    case 'folder':
      return { width: 360, height: 280 };
    default:
      return { width: 280, height: 200 };
  }
}

export function centerPosition(width: number, height: number) {
  const { vw, vh } = getViewportBounds();
  return {
    x: Math.max(12, Math.round((vw - width) / 2)),
    y: Math.max(32, Math.round((vh - height) / 2)),
  };
}

export function applyResize(
  edge: ResizeHandle,
  origin: { x: number; y: number; width: number; height: number },
  dx: number,
  dy: number,
  minW: number,
  minH: number,
  maxW: number,
  maxH: number,
) {
  let { x, y, width, height } = origin;

  const clampW = (w: number) => Math.min(maxW, Math.max(minW, w));
  const clampH = (h: number) => Math.min(maxH, Math.max(minH, h));

  if (edge.includes('e')) {
    width = clampW(origin.width + dx);
  }
  if (edge.includes('w')) {
    const nextW = clampW(origin.width - dx);
    x = origin.x + (origin.width - nextW);
    width = nextW;
  }
  if (edge.includes('s')) {
    height = clampH(origin.height + dy);
  }
  if (edge.includes('n')) {
    const nextH = clampH(origin.height - dy);
    y = origin.y + (origin.height - nextH);
    height = nextH;
  }

  x = Math.max(0, Math.min(x, window.innerWidth - width));
  y = Math.max(28, Math.min(y, window.innerHeight - height - 24));

  return { x, y, width, height };
}
