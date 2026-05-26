import { useState } from 'react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  tools: string[];
  image: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp1',
    title: 'GENERATIVE_MESH',
    description: 'Real-time vertex manipulation based on audio frequencies.',
    tools: ['Three.js', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=600&q=80',
  },
  {
    id: 'exp2',
    title: 'LATENT_SPACE_NAV',
    description: 'Visualizing high-dimensional embeddings for creative discovery.',
    tools: ['PyTorch', 'React'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
  },
];

export function ExperimentsPage() {
  const [selected, setSelected] = useState<Experiment | null>(null);

  return (
    <div className="experiments-page">
      <div className="experiments-grid">
        {EXPERIMENTS.map((exp) => (
          <div 
            key={exp.id} 
            className="experiment-card"
            onClick={() => setSelected(exp)}
          >
            <div 
              className="experiment-card__image" 
              style={{ backgroundImage: `url(${exp.image})` }} 
            />
            <div className="experiment-card__overlay">
              <span className="experiment-card__label">{exp.title}</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="experiment-popup" onClick={() => setSelected(null)}>
          <div className="experiment-popup__content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelected(null)}>×</button>
            <img src={selected.image} alt={selected.title} />
            <div className="popup-details">
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <div className="popup-tools">
                {selected.tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
