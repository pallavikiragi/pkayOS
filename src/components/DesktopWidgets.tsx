import { useState } from 'react';
import {
  DESKTOP_WIDGETS,
  SPOTIFY_EMBED_URL,
  WIDGET_ARTWORK,
} from '../data/widgets';
import { ProjectHighlightsWidget } from './ProjectHighlightsWidget';
import { ReleaseNotesContent } from './ReleaseNotesContent';
import { OverviewWindow } from './OverviewWindow';
import type { OSMode } from '../types';

interface DesktopWidgetsProps {
  mode: OSMode;
  onOpenProject: (id: string) => void;
}

export function DesktopWidgets({ mode, onOpenProject }: DesktopWidgetsProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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
            if (mode === 'sound') return null; // We'll show a bigger player in highlights slot
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
            if (mode === 'sound') {
              return (
                <OverviewWindow
                  key={widget.id}
                  title="LATEST TRACK"
                  layout={widget.layout}
                  variant="document"
                >
                  <div className="music-player">
                    <div 
                      className="music-player__cover" 
                      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80)' }}
                    />
                    <div className="music-player__info">
                      <span className="music-player__track">VOLUMETRIC_SIGNALS.WAV</span>
                      <span className="music-player__artist">PALLAVI_K</span>
                    </div>
                    <div className="music-player__controls">
                      <button className="music-player__btn">«</button>
                      <button 
                        className="music-player__btn music-player__btn--play"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? 'Ⅱ' : '▶'}
                      </button>
                      <button className="music-player__btn">»</button>
                    </div>
                  </div>
                </OverviewWindow>
              );
            }
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
