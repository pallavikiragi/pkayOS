import {
  DESKTOP_WIDGETS,
  SPOTIFY_EMBED_URL,
  WIDGET_ARTWORK,
} from '../data/widgets';
import { ProjectHighlightsWidget } from './ProjectHighlightsWidget';
import { ReleaseNotesContent } from './ReleaseNotesContent';
import { OverviewWindow } from './OverviewWindow';

interface DesktopWidgetsProps {
  onOpenProject: (id: string) => void;
}

export function DesktopWidgets({ onOpenProject }: DesktopWidgetsProps) {
  return (
    <div className="desktop__widgets">
      {DESKTOP_WIDGETS.map((widget) => {
        switch (widget.id) {
          case 'latest-artwork':
            return (
              <OverviewWindow
                key={widget.id}
                layout={widget.layout}
                variant="minimal"
              >
                <button
                  type="button"
                  className="overview-artwork"
                  onClick={() => onOpenProject(WIDGET_ARTWORK.projectId)}
                  aria-label="Open latest artwork project"
                >
                  <div
                    className="overview-artwork__img"
                    style={{
                      backgroundImage: `url(${WIDGET_ARTWORK.image})`,
                    }}
                  />
                </button>
              </OverviewWindow>
            );

          case 'latest-music':
            return (
              <OverviewWindow
                key={widget.id}
                layout={widget.layout}
                variant="minimal"
              >
                <div className="overview-spotify">
                  <iframe
                    title="Spotify player"
                    src={SPOTIFY_EMBED_URL}
                    width="100%"
                    height="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </OverviewWindow>
            );

          case 'release-notes':
            return (
              <OverviewWindow
                key={widget.id}
                title={widget.title}
                layout={widget.layout}
                variant="document"
              >
                <div className="overview-doc-panel">
                  <div className="overview-doc-panel__scroll">
                    <ReleaseNotesContent compact />
                  </div>
                </div>
              </OverviewWindow>
            );

          case 'project-highlights':
            return (
              <ProjectHighlightsWidget
                key={widget.id}
                title={widget.title}
                layout={widget.layout}
                onOpenProject={onOpenProject}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
