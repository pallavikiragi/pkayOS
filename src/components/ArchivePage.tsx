import { useState } from 'react';
import { PROJECTS } from '../data/content';
import { ProjectTile } from './ProjectTile';
import { Button } from './Button';

interface ArchivePageProps {
  type: 'all' | 'feature' | 'studio';
  onOpenProject: (id: string) => void;
}

export function ArchivePage({ type, onOpenProject }: ArchivePageProps) {
  const [filter, setFilter] = useState('ALL');

  const allProjects = PROJECTS;
  const filtered = allProjects.filter((p) => {
    if (type === 'feature' && !p.tags.includes('FEATURED')) {
      // Logic for featured can be expanded
    }
    if (filter === 'ALL') return true;
    return p.tags.includes(filter);
  });

  const categories = ['ALL', 'UX', 'SYSTEM', 'INTERACTIVE', 'SPATIAL', 'BRAND'];

  return (
    <div className="archive-page">
      <header className="archive-page__header">
        <h1 className="archive-page__title">
          {type === 'all' ? 'PROJECT_ARCHIVE' : type === 'feature' ? 'FEATURED_SELECTION' : 'STUDIO_WORK'}
        </h1>
        <div className="filter-chips">
          {categories.map((cat) => (
            <Button
              compact
              key={cat}
              variant={filter === cat ? 'blue' : 'default'}
              className="filter-chip"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <div className="project-grid project-grid--archive">
        {filtered.map((project) => (
          <ProjectTile 
            key={project.id} 
            project={project} 
            onOpen={() => onOpenProject(project.id)} 
          />
        ))}
      </div>
    </div>
  );
}
