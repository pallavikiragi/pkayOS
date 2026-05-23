import { useMemo, useState } from 'react';
import { getHighlightProjects } from '../data/widgets';
import type { WidgetLayout } from '../data/widgets';
import { OverviewWindow } from './OverviewWindow';
import { ProjectTile } from './ProjectTile';

const PER_PAGE = 1;

interface ProjectHighlightsWidgetProps {
  title: string;
  layout: WidgetLayout;
  onOpenProject: (id: string) => void;
}

export function ProjectHighlightsWidget({
  title,
  layout,
  onOpenProject,
}: ProjectHighlightsWidgetProps) {
  const projects = useMemo(() => getHighlightProjects(), []);
  const pageCount = Math.max(1, Math.ceil(projects.length / PER_PAGE));
  const [page, setPage] = useState(0);

  const visible = projects.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE,
  );

  const goPrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const goNext = () => setPage((p) => (p + 1) % pageCount);

  return (
    <OverviewWindow
      title={title}
      layout={layout}
      variant="highlights"
      headerActions={
        <div className="overview-window__nav">
          <button
            type="button"
            className="overview-window__nav-btn"
            onClick={goPrev}
            aria-label="Previous projects"
          >
            ←
          </button>
          <button
            type="button"
            className="overview-window__nav-btn"
            onClick={goNext}
            aria-label="Next projects"
          >
            →
          </button>
        </div>
      }
    >
      <ul className="project-grid project-grid--widget project-grid--widget-single">
        {visible[0] && (
          <ProjectTile
            key={visible[0].id}
            project={visible[0]}
            excerptLength={120}
            onOpen={onOpenProject}
          />
        )}
      </ul>
    </OverviewWindow>
  );
}
