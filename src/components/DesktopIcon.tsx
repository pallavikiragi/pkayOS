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
  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? 'desktop-icon--selected' : ''}`}
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
