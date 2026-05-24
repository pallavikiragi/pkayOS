import type { FolderMeta } from '../types';

interface DesktopIconProps {
  folder: FolderMeta;
  selected: boolean;
  onOpen: () => void;
}

function IconGraphic({ icon }: { icon: FolderMeta['icon'] }) {
  if (icon === 'trash') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="8" y="10" width="16" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="6" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="2" />
        <line x1="13" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'info') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="4" y="6" width="24" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="8" width="20" height="12" fill="currentColor" opacity="0.15" />
        <line x1="8" y1="26" x2="24" y2="26" stroke="currentColor" strokeWidth="2" />
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
        <line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === 'gesture') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path d="M6 12 Q12 8 18 12 T30 12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 18 Q12 14 18 18 T30 18" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 24 Q14 20 20 24 T28 24" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'interface') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="5" y="6" width="22" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="5" y1="12" x2="27" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="6" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="14" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="15" y="14" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (icon === 'palette') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
        <circle cx="22" cy="10" r="2" fill="currentColor" />
        <circle cx="8" cy="18" r="2" fill="currentColor" />
        <circle cx="24" cy="18" r="2" fill="currentColor" />
        <circle cx="14" cy="24" r="2" fill="currentColor" />
        <circle cx="18" cy="24" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'chart') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <rect x="6" y="8" width="3" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="12" width="3" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="10" width="3" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="24" y="6" width="3" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="4" y1="24" x2="29" y2="24" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (icon === 'cube') {
    return (
      <svg viewBox="0 0 32 32" className="desktop-icon__svg" aria-hidden>
        <path d="M8 14 L8 24 L16 28 L24 24 L24 14 L16 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="10" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="14" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5" />
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
  const isSpecial = folder.label === 'SOUND.EXE';

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
