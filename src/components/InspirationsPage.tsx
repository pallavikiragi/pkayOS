const IMAGES = [
  'https://images.unsplash.com/photo-1514565131-5a3d84509f8e?w=400&q=80',
  'https://images.unsplash.com/photo-1519501025264-65ba3770bf71?w=400&q=80',
  'https://images.unsplash.com/photo-1480714378408-67cf0d7bc263?w=400&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e62dca55bd?w=400&q=80',
];

export function InspirationsPage() {
  return (
    <div className="moodboard-page">
      <div className="moodboard-grid">
        {IMAGES.map((src, i) => (
          <div key={i} className="moodboard-item" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
    </div>
  );
}
