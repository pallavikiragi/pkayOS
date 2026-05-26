export function SocialsPage() {
  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/pallavikiragi', icon: '🔗' },
    { name: 'Spotify', url: 'https://open.spotify.com/user/pallavi', icon: '🎵' },
    { name: 'Instagram', url: 'https://instagram.com/pallavi', icon: '📸' },
  ];

  return (
    <div className="socials-popup">
      <div className="socials-list">
        {socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">{s.icon}</span>
            <span className="social-name">{s.name.toUpperCase()}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
