import { useState, type Dispatch, type PointerEvent, type SetStateAction } from 'react';
import { DESIGN_FOLDERS, PROJECTS, SOUND_FOLDERS } from '../data/content';
import type { FolderId, FolderMeta, OSMode } from '../types';
import { ReleaseNotesContent } from './ReleaseNotesContent';
import designAi from '../assets/portfolio-icons/light/ai.svg';
import designGraphics from '../assets/portfolio-icons/light/graphics.svg';
import designIndustrial from '../assets/portfolio-icons/light/industrial.svg';
import designInteractive from '../assets/portfolio-icons/light/interactive.svg';
import designPortal from '../assets/portfolio-icons/light/portal.svg';
import designUx from '../assets/portfolio-icons/light/ux.svg';
import musicAlbum from '../assets/portfolio-icons/dark/album.svg';
import musicDemo from '../assets/portfolio-icons/dark/demo.svg';
import musicPortal from '../assets/portfolio-icons/dark/portal.svg';
import musicPress from '../assets/portfolio-icons/dark/press.svg';
import musicScore from '../assets/portfolio-icons/dark/score.svg';
import musicSingle from '../assets/portfolio-icons/dark/single.svg';
import highlightCovidSound from '../assets/homepage/highlight-covid-sound.png';
import highlightNoiseInflation from '../assets/homepage/highlight-noise-inflation.png';
import arrowEnd from '../assets/homepage/arrow-end.svg';

interface HomeScreenProps {
  mode: OSMode;
  onOpenFolder: (folderId: FolderId) => void;
  onOpenProject: (projectId: string) => void;
}

const DESIGN_FOLDER_ORDER: FolderId[] = [
  'emerging-media',
  'sound',
  'digital-interfaces',
  'spatial-design',
  'information-graphics',
  'experiments',
];

const DESIGN_FOLDER_ART: Partial<Record<FolderId, string>> = {
  'emerging-media': designInteractive,
  sound: designPortal,
  'digital-interfaces': designUx,
  'spatial-design': designIndustrial,
  'information-graphics': designGraphics,
  experiments: designAi,
};

const MUSIC_FOLDER_ART: Partial<Record<FolderId, string>> = {
  sound: musicPortal,
  albums: musicAlbum,
  singles: musicSingle,
  press: musicPress,
  'dj-mixes': musicDemo,
  'film-score': musicScore,
};

function getProjectImage(projectId: string) {
  const project = PROJECTS.find((item) => item.id === projectId);
  if (!project) {
    throw new Error(`Homepage highlight project "${projectId}" was not found.`);
  }
  return project.image;
}

const PROJECT_HIGHLIGHTS = [
  {
    projectId: 'covid-sound',
    category: 'Project Feature',
    title: '“Covid Sound” feature in Digital Summer Show of MoCDA',
    details: 'Data Visualization, Multimedia, Coding',
    image: highlightCovidSound,
  },
  {
    projectId: 'noise-cluster',
    category: 'Project Select',
    title: 'Noise Cluster — audio-visual performance system',
    details: 'Performance, Sound, Generative',
    image: highlightNoiseInflation,
  },
  {
    projectId: 'airport-cyberculture',
    category: 'Gallery Display',
    title: 'Cyberculture in Airports',
    details: 'Installation, TouchDesigner, Cyber',
    image: getProjectImage('airport-cyberculture'),
  },
];

const CALLOUT_ANCHORS = [
  {
    id: 'digital',
    folderId: 'digital-interfaces' as FolderId,
    label: 'DIGITAL EXPERIENCE',
    x: 59,
    y: 25,
    endX: 66,
    endY: 28,
  },
  {
    id: 'experiments',
    folderId: 'creative-technology' as FolderId,
    label: 'CREATIVE TECHNOLOGY',
    x: 35,
    y: 62,
    endX: 42,
    endY: 58,
  },
  {
    id: 'systems',
    folderId: 'visual-systems' as FolderId,
    label: 'VISUAL SYSTEMS',
    x: 68,
    y: 68,
    endX: 75,
    endY: 71,
  },
] as const;

type ActiveCallout = {
  id: (typeof CALLOUT_ANCHORS)[number]['id'];
  centerX: number;
  centerY: number;
  localX: number;
  localY: number;
};

function updateActiveCallout(
  event: PointerEvent<HTMLDivElement>,
  id: ActiveCallout['id'],
  setActiveCallout: Dispatch<SetStateAction<ActiveCallout | null>>,
) {
  if (event.pointerType !== 'mouse') return;

  const layer = event.currentTarget.parentElement?.getBoundingClientRect();
  const zone = event.currentTarget.getBoundingClientRect();
  const badge = event.currentTarget.querySelector<HTMLElement>('.home__callout');
  if (!layer || !badge || layer.width === 0 || layer.height === 0) return;

  const halfWidth = badge.offsetWidth / 2 + 4;
  const halfHeight = badge.offsetHeight / 2 + 4;
  const localX = Math.max(
    halfWidth,
    Math.min(zone.width - halfWidth, event.clientX - zone.left),
  );
  const localY = Math.max(
    halfHeight,
    Math.min(zone.height - halfHeight, event.clientY - zone.top),
  );

  setActiveCallout({
    id,
    centerX: ((zone.left + localX - layer.left) / layer.width) * 100,
    centerY: ((zone.top + localY - layer.top) / layer.height) * 100,
    localX,
    localY,
  });
}

export function HomeScreen({
  mode,
  onOpenFolder,
  onOpenProject,
}: HomeScreenProps) {
  const [activeCallout, setActiveCallout] = useState<ActiveCallout | null>(
    null,
  );
  const [isHighlightsPinned, setIsHighlightsPinned] = useState(false);
  const [isHighlightsHovered, setIsHighlightsHovered] = useState(false);
  const isHighlightsOpen = isHighlightsPinned || isHighlightsHovered;
  const folderSource = mode === 'design' ? DESIGN_FOLDERS : SOUND_FOLDERS;
  const folders = folderSource.filter(
    (folder): folder is FolderMeta =>
      folder !== null &&
      folder.id !== 'about' &&
      folder.id !== 'trash' &&
      folder.id !== 'sound' &&
      folder.id !== 'playground' &&
      folder.id !== 'branding-strategy',
  );
  const visibleFolders =
    mode === 'design'
      ? DESIGN_FOLDER_ORDER.map((id) =>
          folders.find((folder) => folder.id === id),
        ).filter((folder): folder is FolderMeta => folder !== undefined)
      : folders;

  return (
    <section className="desktop__home" aria-label="Portfolio home">
      <div className="home__intro">
        <h1>
          Designing how
          <br />
          things feel.
        </h1>
        <span className="home__hero-rule" aria-hidden="true" />
      </div>

      <div className="home__callouts">
        <svg
          className="home__callout-lines"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CALLOUT_ANCHORS.map((anchor) => {
            const active = activeCallout?.id === anchor.id;
            return (
              <g key={anchor.id} className="home__callout-anchor-group">
                <line
                  x1={anchor.x * 10}
                  y1={anchor.y * 10}
                  x2={(active ? activeCallout.centerX : anchor.endX) * 10}
                  y2={(active ? activeCallout.centerY : anchor.endY) * 10}
                />
              </g>
            );
          })}
        </svg>
        {CALLOUT_ANCHORS.map((anchor) => (
          <span
            key={`${anchor.id}-anchor`}
            className="home__callout-anchor-point"
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
            aria-hidden="true"
          />
        ))}
        {CALLOUT_ANCHORS.map((anchor) => (
          <div
            key={anchor.id}
            className={`home__callout-zone home__callout-zone--${anchor.id}`}
            onPointerEnter={(event) =>
              updateActiveCallout(event, anchor.id, setActiveCallout)
            }
            onPointerMove={(event) =>
              updateActiveCallout(event, anchor.id, setActiveCallout)
            }
            onPointerLeave={() => setActiveCallout(null)}
            onClick={() => onOpenFolder(anchor.folderId)}
            onFocus={() =>
              setActiveCallout({
                id: anchor.id,
                centerX: anchor.endX,
                centerY: anchor.endY,
                localX: -1,
                localY: -1,
              })
            }
            onBlur={() => setActiveCallout(null)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenFolder(anchor.folderId);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${anchor.label} projects`}
          >
            <span
              className={`home__callout home__callout--${anchor.id} ${
                activeCallout?.id === anchor.id ? 'home__callout--active' : ''
              }`}
              style={
                activeCallout?.id === anchor.id &&
                activeCallout.localX >= 0
                  ? {
                      left: `${activeCallout.localX}px`,
                      top: `${activeCallout.localY}px`,
                    }
                  : undefined
              }
              aria-hidden="true"
            >
              {anchor.label}
            </span>
          </div>
        ))}
      </div>

      <article className="home__release">
        <header className="home__panel-heading">
          <span className="home__status-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>RELEASE NOTES</span>
        </header>
        <div className="home__release-content">
          <ReleaseNotesContent compact />
        </div>
      </article>

      <nav
        className="home__categories"
        aria-label="Explore categories and mode switch"
      >
        <button
          className="home__portal"
          type="button"
          onClick={() => onOpenFolder('sound')}
          aria-label={`Switch to ${mode === 'design' ? 'music' : 'design'} mode`}
        >
          <img
            src={mode === 'design' ? designPortal : musicPortal}
            alt=""
          />
        </button>
        {visibleFolders.map((folder) => {
          const icon =
            mode === 'design'
              ? DESIGN_FOLDER_ART[folder.id]
              : MUSIC_FOLDER_ART[folder.id];
          return (
            <button
              className={`home__category ${
                icon ? 'home__category--image' : 'home__category--fallback'
              }`}
              key={folder.id}
              type="button"
              onClick={() => onOpenFolder(folder.id)}
              aria-label={`Open ${folder.label.toLowerCase()} folder`}
            >
              {icon ? (
                <img
                  className="home__category-image"
                  src={icon}
                  alt=""
                />
              ) : (
                <>
                  <span className="home__category-fallback-tab" />
                  <span className="home__category-label">{folder.label}</span>
                </>
              )}
            </button>
          );
        })}
      </nav>

      <section
        className={`home__project-section ${
          isHighlightsOpen ? 'home__project-section--open' : ''
        }`}
        aria-label="Project highlights"
        onMouseEnter={() => setIsHighlightsHovered(true)}
        onMouseLeave={() => setIsHighlightsHovered(false)}
      >
        <button
          type="button"
          className="home__highlights-heading"
          onClick={() => setIsHighlightsPinned((prev) => !prev)}
          aria-expanded={isHighlightsOpen}
          aria-controls="home-highlights-grid"
          aria-label="Toggle Project Highlights accordion"
        >
          <span>Project Highlights</span>
          <span className="home__highlights-heading-meta" aria-hidden="true">
            <span className="home__highlights-count">3</span>
            <svg
              className="home__highlights-chevron"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <path
                d="M2 6.5L5 3.5L8 6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </button>
        <div
          id="home-highlights-grid"
          className={`home__highlights-accordion ${
            isHighlightsOpen ? 'home__highlights-accordion--open' : ''
          }`}
          aria-hidden={!isHighlightsOpen}
        >
          <div className="home__highlights-accordion-inner">
            <div className="home__highlights">
              {PROJECT_HIGHLIGHTS.map((project) => (
                <article
                  className="home__highlight"
                  key={project.projectId}
                  onClick={() => onOpenProject(project.projectId)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProject(project.projectId);
                    }
                  }}
                >
                  <div className="home__highlight-image">
                    <img src={project.image} alt="" />
                  </div>
                  <div className="home__highlight-copy">
                    <div>
                      <p className="home__highlight-category">{project.category}</p>
                      <h3>{project.title}</h3>
                      <p className="home__highlight-details">{project.details}</p>
                    </div>
                    <button
                      type="button"
                      className="home__highlight-open"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProject(project.projectId);
                      }}
                      aria-label={`Open ${project.title}`}
                    >
                      <img src={arrowEnd} alt="" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
