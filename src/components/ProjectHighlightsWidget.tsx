import { OverviewWindow } from './OverviewWindow';
import type { WidgetLayout } from '../data/widgets';

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
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            className="overview-window__nav-btn"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      }
    >
      <div className="highlight-feature">
        <div className="highlight-feature__banner">
          Project feature in Digital Summer Show of MoCDA
        </div>
        <div 
          className="highlight-feature__image" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80)' }}
        />
        <div className="highlight-feature__content">
          <p className="highlight-feature__desc">
            My project "Covid Sound" was selected alongside other 30 international projects in a virtual museum showcase conducted by Museum of Contemporary Digital Arts (MoCDA).
          </p>
          <div className="highlight-feature__meta">
            <span className="highlight-feature__year">YEAR: 2022</span>
            <button 
              className="highlight-feature__cta"
              onClick={() => onOpenProject('covid-sound')}
            >
              OPEN PROJECT →
            </button>
          </div>
        </div>
      </div>
    </OverviewWindow>
  );
}
