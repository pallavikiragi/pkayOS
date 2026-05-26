import { useState } from 'react';

interface Client {
  id: string;
  name: string;
  logo: string;
  projectId: string;
}

const CLIENTS: Client[] = [
  { id: 'cl1', name: 'DELOITTE', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80', projectId: 'deloitte' },
  { id: 'cl2', name: 'ORANGE', logo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80', projectId: 'orange-business' },
];

interface ClientsPageProps {
  onOpenProject: (id: string) => void;
}

export function ClientsPage({ onOpenProject }: ClientsPageProps) {
  const [selected, setSelected] = useState<Client | null>(null);

  return (
    <div className="network-page">
      <div className="network-grid network-grid--clients">
        {CLIENTS.map((c) => (
          <div key={c.id} className="network-card" onClick={() => setSelected(c)}>
            <div className="network-card__image network-card__image--logo" style={{ backgroundImage: `url(${c.logo})` }} />
            <div className="network-card__label">{c.name}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="network-popup" onClick={() => setSelected(null)}>
          <div className="network-popup__content" onClick={e => e.stopPropagation()}>
            <h3>CLIENT: {selected.name}</h3>
            <button 
              className="network-cta" 
              onClick={() => {
                onOpenProject(selected.projectId);
                setSelected(null);
              }}
            >
              [ VIEW CASE STUDY ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
