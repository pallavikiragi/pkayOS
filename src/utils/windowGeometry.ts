import type { WindowKind } from '../types';

export type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const MENU_BAR_HEIGHT = 28;

export function getViewportBounds() {
  return {
    vw: window.innerWidth,
    vh: window.innerHeight,
    maxW: window.innerWidth,
    maxH: window.innerHeight - MENU_BAR_HEIGHT,
  };
}

export function getDefaultSize(kind: WindowKind): { width: number; height: number } {
  const { maxW, maxH } = getViewportBounds();

  switch (kind) {
    case 'project':
      return {
        // Case study popup occupies 3/4 of the window length and full height
        width: Math.min(window.innerWidth, Math.round(window.innerWidth * 0.75)),
        height: window.innerHeight - MENU_BAR_HEIGHT,
      };
    case 'folder':
      return {
        width: Math.min(820, Math.max(280, maxW - 24)),
        height: Math.min(548, maxH),
      };
    case 'archive':
    case 'experiments':
    case 'collaborations':
    case 'socials':
    case 'contact':
    case 'clients':
    case 'resume':
    case 'journey':
    case 'logs':
    case 'inspirations':
    case 'writings':
      return {
        width: maxW - 40,
        height: maxH - 20,
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
    case 'archive':
    case 'experiments':
    case 'collaborations':
    case 'socials':
    case 'contact':
    case 'clients':
    case 'resume':
    case 'journey':
    case 'logs':
    case 'inspirations':
    case 'writings':
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
  y = Math.max(28, Math.min(y, window.innerHeight - height));

  return { x, y, width, height };
}
