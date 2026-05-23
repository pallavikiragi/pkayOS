import type { Project } from '../types';
import { formatTagList, toTitleCase, truncateText } from '../utils/display';

interface ProjectTileProps {
  project: Project;
  excerptLength?: number;
  onOpen: (id: string) => void;
}

export function ProjectTile({
  project,
  excerptLength = 200,
  onOpen,
}: ProjectTileProps) {
  return (
    <li className="project-card">
      <div className="project-card__tile">
        <div
          className="project-card__visual"
          style={{ backgroundImage: `url(${project.image})` }}
        >
          <div className="project-card__scrim" aria-hidden />
          <h3 className="project-card__title">{toTitleCase(project.title)}</h3>
          <p className="project-card__excerpt">
            {truncateText(project.summary, excerptLength)}
          </p>
          <button
            type="button"
            className="project-card__open"
            onClick={() => onOpen(project.id)}
          >
            OPEN →
          </button>
        </div>
        <p className="project-card__tags-line">{formatTagList(project.tags)}</p>
      </div>
    </li>
  );
}
