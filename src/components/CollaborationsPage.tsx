import { useState } from 'react';

interface Collaboration {
  id: string;
  partner: string;
  role: string;
  image: string;
  projectId: string;
}

const COLLABS: Collaboration[] = [
  {
    id: 'c1',
    partner: 'STUDIO_X',
    role: 'Co-designer',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    projectId: 'deloitte',
  },
];

interface CollaborationsPageProps {
  onOpenProject: (id: string) => void;
}

export function CollaborationsPage({ onOpenProject }: CollaborationsPageProps) {
  const [selected, setSelected] = useState<Collaboration | null>(null);

  return (
    <div className="network-page">
      <div className="network-grid">
        {COLLABS.map((c) => (
          <div key={c.id} className="network-card" onClick={() => setSelected(c)}>
            <div className="network-card__image" style={{ backgroundImage: `url(${c.image})` }} />
            <div className="network-card__label">{c.partner}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="network-popup" onClick={() => setSelected(null)}>
          <div className="network-popup__content" onClick={e => e.stopPropagation()}>
            <h3>{selected.partner}</h3>
            <p>ROLE: {selected.role}</p>
            <button 
              className="network-cta" 
              onClick={() => {
                onOpenProject(selected.projectId);
                setSelected(null);
              }}
            >
              [ OPEN PROJECT ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
