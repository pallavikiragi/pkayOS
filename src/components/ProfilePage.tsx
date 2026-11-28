import { AboutContent } from './AboutContent';

interface ProfilePageProps {
  onClose: () => void;
}

export function ProfilePage({ onClose }: ProfilePageProps) {
  return (
    <section className="desktop__profile" aria-label="Profile">
      <div className="profile-page">
        <header className="profile-page__titlebar">
          <button
            type="button"
            className="profile-page__close"
            onClick={onClose}
            aria-label="Close window"
          />
          <span className="profile-page__title">ABOUT.TXT</span>
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
