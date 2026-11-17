import { useState } from 'react';
import { AboutContent } from './AboutContent';

interface ProfilePageProps {
  onClose: () => void;
}

export function ProfilePage({ onClose }: ProfilePageProps) {
  const [isMaximized, setIsMaximized] = useState(true);

  return (
    <section
      className={`desktop__profile${isMaximized ? '' : ' desktop__profile--windowed'}`}
      aria-label="Profile"
    >
      <div className="profile-page">
        <header className="os-window__titlebar profile-page__titlebar">
          <button
            type="button"
            className="os-window__close"
            onClick={onClose}
            aria-label="Close window"
          >×</button>
          <div className="os-window__titlebar-drag profile-page__titlebar-drag">
            <span className="os-window__title">ABOUT.TXT</span>
          </div>
          <div className="os-window__controls">
            <button
              type="button"
              className="os-window__control os-window__minimize"
              onClick={onClose}
              aria-label="Minimize window"
              title="Minimize"
            />
            <button
              type="button"
              className={`os-window__control os-window__maximize${isMaximized ? ' os-window__maximize--active' : ''}`}
              onClick={() => setIsMaximized((maximized) => !maximized)}
              aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
              title={isMaximized ? 'Restore' : 'Maximize'}
            />
          </div>
        </header>
        <div className="profile-page__body">
          <AboutContent />
        </div>
        <footer className="profile-page__status">
          PROFILE DOCUMENT · STATUS: READ ONLY
        </footer>
      </div>
    </section>
  );
}
