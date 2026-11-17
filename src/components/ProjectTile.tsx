import type { Project } from '../types';
import { formatTagList, toTitleCase, truncateText } from '../utils/display';

interface ProjectTileProps {
  project: Project;
  excerptLength?: number;
  onOpen: (id: string) => void;
}

export function ProjectTile({
  project,
  excerptLength = 160,
  onOpen,
}: ProjectTileProps) {
  return (
    <li
      className="project-card"
      onClick={() => onOpen(project.id)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
    >
      <div className="project-card__tile">
        <div
          className="project-card__visual"
          style={{ backgroundImage: `url(${project.image})` }}
        >
          <div className="project-card__scrim" aria-hidden />
          <div className="project-card__meta-badges">
            <span className="project-card__badge project-card__badge--year">
              {project.year}
            </span>
            {project.tags[0] && (
              <span className="project-card__badge project-card__badge--tag">
                {project.tags[0]}
              </span>
            )}
          </div>
          <h3 className="project-card__title">{toTitleCase(project.title)}</h3>
          <p className="project-card__excerpt">
            {truncateText(project.summary, excerptLength)}
          </p>
          <button
            type="button"
            className="project-card__open"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project.id);
            }}
          >
            OPEN →
          </button>
        </div>
        <p className="project-card__tags-line">{formatTagList(project.tags)}</p>
      </div>
    </li>
  );
}
