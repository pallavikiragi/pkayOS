import { useMemo, useState } from 'react';
import {
  FOLDERS,
  getFolderTags,
  getProjectsByFolder,
} from '../data/content';
import type { FolderId } from '../types';
import { ProjectTile } from './ProjectTile';

interface FolderWindowProps {
  folderId: FolderId;
  onOpenProject: (id: string) => void;
}

export function FolderWindow({ folderId, onOpenProject }: FolderWindowProps) {
  const [activeTag, setActiveTag] = useState('ALL');
  const folder = FOLDERS.find((f) => f.id === folderId);
  const tags = useMemo(() => getFolderTags(folderId), [folderId]);
  const projects = useMemo(() => {
    const all = getProjectsByFolder(folderId);
    if (activeTag === 'ALL') return all;
    return all.filter((p) => p.tags.includes(activeTag));
  }, [folderId, activeTag]);

  return (
    <div className="folder-window">
      <header className="folder-window__header">
        <p className="folder-window__path">
          DESKTOP / {folder?.label ?? 'UNKNOWN'}
        </p>
        <p className="folder-window__desc">{folder?.description}</p>
      </header>

      <div className="filter-chips" role="toolbar" aria-label="Filter projects">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filter-chip ${activeTag === tag ? 'filter-chip--active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="project-grid">
        {projects.map((project) => (
          <ProjectTile
            key={project.id}
            project={project}
            onOpen={onOpenProject}
          />
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="folder-window__empty">NO FILES MATCH FILTER.</p>
      )}
    </div>
  );
}
