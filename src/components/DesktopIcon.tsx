import type { FolderMeta } from '../types';

interface DesktopIconProps {
  folder: FolderMeta;
  selected: boolean;
  onOpen: () => void;
}

function IconGraphic({ icon }: { icon: FolderMeta['icon'] }) {
  if (icon === 'user') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path d="M16 8 A4 4 0 1 0 16 16 A4 4 0 1 0 16 8 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 26 Q6 20 16 20 T26 26" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'trash') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path
          d="M4 10 H14 L16 8 H28 V26 H4 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="12" y1="16" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === 'piano') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="4" y="6" width="24" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <line className="anim-piano-1" x1="10" y1="6" x2="10" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <line className="anim-piano-2" x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <line className="anim-piano-3" x1="22" y1="6" x2="22" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="6" width="4" height="12" fill="currentColor" />
        <rect x="13" y="6" width="4" height="12" fill="currentColor" />
        <rect x="19" y="6" width="4" height="12" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'single') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="12" y="6" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" className="anim-single-sq-1" />
        <rect x="6" y="10" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" className="anim-single-sq-2" />
        <path d="M12 22 V10 L20 12 V18" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="22" r="3" fill="currentColor" />
        <circle cx="17" cy="18" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'vinyl') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <defs>
          <clipPath id="vinyl-clip">
            <rect x="16" y="0" width="16" height="32" />
          </clipPath>
        </defs>
        <g clipPath="url(#vinyl-clip)">
          <g className="anim-vinyl-out">
            <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </g>
        </g>
        <rect x="4" y="6" width="12" height="20" fill="var(--bg-paper)" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="6" x2="12" y2="26" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === 'dj') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="4" y="12" width="24" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="anim-spin" />
        <circle cx="22" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="anim-spin" />
        <line x1="16" y1="14" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6 Q8 2 10 6" fill="none" stroke="currentColor" strokeWidth="1" className="anim-note-1" />
        <path d="M22 6 Q24 2 26 6" fill="none" stroke="currentColor" strokeWidth="1" className="anim-note-2" />
        <path d="M14 4 Q16 0 18 4" fill="none" stroke="currentColor" strokeWidth="1" className="anim-note-3" />
      </svg>
    );
  }
  if (icon === 'clapper') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <g className="anim-clapper-top" style={{ transformOrigin: '4px 14px' }}>
          <rect x="4" y="8" width="24" height="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="8" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <rect x="4" y="14" width="24" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="4" y1="18" x2="28" y2="18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === 'cursor') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path
          className="anim-ux-web"
          d="M8 4 L22 14 L16 16 L24 26 L20 28 L12 18 L8 22 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (icon === 'sparkle') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path className="anim-ai-star-1" d="M16 4 Q16 12 24 12 Q16 12 16 20 Q16 12 8 12 Q16 12 16 4 Z" fill="currentColor" />
        <path className="anim-ai-star-2" d="M26 18 Q26 22 30 22 Q26 22 26 26 Q26 22 22 22 Q26 22 26 18 Z" fill="currentColor" opacity="0.7" />
        <path className="anim-ai-star-3" d="M8 20 Q8 23 11 23 Q8 23 8 26 Q8 23 5 23 Q8 23 8 20 Z" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }
  if (icon === 'doc') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path
          d="M8 4 H18 L24 10 V28 H8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M18 4 V10 H24" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.5" className="anim-doc-line-1" />
        <line x1="11" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.5" className="anim-doc-line-2" />
        <line x1="11" y1="24" x2="17" y2="24" stroke="currentColor" strokeWidth="1.5" className="anim-doc-line-3" />
      </svg>
    );
  }
  if (icon === 'gesture') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path className="anim-wave-1" d="M4 12 C8 8 12 16 16 12 C20 8 24 16 28 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="anim-wave-2" d="M4 18 C8 14 12 22 16 18 C20 14 24 22 28 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="anim-wave-3" d="M4 24 C8 20 12 28 16 24 C20 20 24 28 28 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === 'interface') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <g className="anim-ux-web">
          <rect x="4" y="8" width="12" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="anim-ux-app">
          <rect x="18" y="6" width="10" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="23" cy="22" r="1" fill="currentColor" />
        </g>
      </svg>
    );
  }
  if (icon === 'palette') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect className="anim-post-it-1" x="6" y="6" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect className="anim-post-it-2" x="16" y="10" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect className="anim-post-it-3" x="8" y="18" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'chart') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect className="anim-bar-1" x="6" y="6" width="3" height="18" fill="currentColor" />
        <rect className="anim-bar-2" x="12" y="6" width="3" height="18" fill="currentColor" />
        <rect className="anim-bar-3" x="18" y="6" width="3" height="18" fill="currentColor" />
        <rect className="anim-bar-4" x="24" y="6" width="3" height="18" fill="currentColor" />
        <line x1="4" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'cube') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <g className="anim-cube">
          <path d="M16 6 L26 11 L26 21 L16 26 L6 21 L6 11 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="16" x2="26" y2="11" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="16" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
      <path
        d="M4 10 H14 L16 8 H28 V26 H4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function DesktopIcon({ folder, selected, onOpen }: DesktopIconProps) {
  const isSpecial = folder.label === 'SOUND.EXE' || folder.label === 'DESIGN.EXE';

  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? 'desktop-icon--selected' : ''} ${isSpecial ? 'desktop-icon--special' : ''}`}
      onDoubleClick={onOpen}
      onClick={onOpen}
      aria-label={`Open ${folder.label}`}
    >
      <span className="desktop-icon__frame">
        <IconGraphic icon={folder.icon} />
      </span>
      <span className="desktop-icon__label">{folder.label}</span>
    </button>
  );
}
