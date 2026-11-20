import {
  useRef,
  useState,
  type Dispatch,
  type PointerEvent,
  type SetStateAction,
} from 'react';
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

const SOUND_HIGHLIGHTS = [
  {
    id: 'latest-single',
    category: 'RECENT TRACKS',
    title: 'Ancestry',
    details: 'Latest Single',
    image: musicSingle,
    folderId: 'singles' as FolderId,
  },
  {
    id: 'latest-album',
    category: 'FULL-LENGTH RELEASES',
    title: 'Latest Album',
    details: 'Explore album releases',
    image: musicAlbum,
    folderId: 'albums' as FolderId,
  },
  {
    id: 'latest-press',
    category: 'FEATURES & INTERVIEWS',
    title: 'Latest Press',
    details: 'Explore press features',
    image: musicPress,
    folderId: 'press' as FolderId,
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
    space: {
      left: 46,
      top: 8,
      width: 32,
      height: 34,
    },
  },
  {
    id: 'experiments',
    folderId: 'creative-technology' as FolderId,
    label: 'CREATIVE TECHNOLOGY',
    x: 35,
    y: 62,
    endX: 42,
    endY: 58,
    space: {
      left: 20,
      top: 42,
      width: 32,
      height: 36,
    },
  },
  {
    id: 'systems',
    folderId: 'visual-systems' as FolderId,
    label: 'VISUAL SYSTEMS',
    x: 68,
    y: 68,
    endX: 75,
    endY: 71,
    space: {
      left: 54,
      top: 48,
      width: 30,
      height: 36,
    },
  },
] as const;

type CalloutAnchor = {
  id: (typeof CALLOUT_ANCHORS)[number]['id'];
  folderId: FolderId;
  label: string;
  x: number;
  y: number;
  endX: number;
  endY: number;
  space: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

type ActiveCallout = {
  id: (typeof CALLOUT_ANCHORS)[number]['id'];
  x: number;
  y: number;
};

function handleSpacePointerMove(
  event: PointerEvent<HTMLDivElement>,
  anchor: CalloutAnchor,
  containerRef: React.RefObject<HTMLDivElement | null>,
  setActiveCallout: Dispatch<SetStateAction<ActiveCallout | null>>,
) {
  if (event.pointerType !== 'mouse') return;

  const containerRect = containerRef.current?.getBoundingClientRect();
  if (
    !containerRect ||
    containerRect.width === 0 ||
    containerRect.height === 0
  ) {
    return;
  }

  // Pointer position in percentage coordinates of the callouts container
  const rawX =
    ((event.clientX - containerRect.left) / containerRect.width) * 100;
  const rawY =
    ((event.clientY - containerRect.top) / containerRect.height) * 100;

  // Clamp within the anchor's active space with boundary padding
  const padX = 4.5;
  const padY = 2.5;
  const clampedX = Math.max(
    anchor.space.left + padX,
    Math.min(anchor.space.left + anchor.space.width - padX, rawX),
  );
  const clampedY = Math.max(
    anchor.space.top + padY,
    Math.min(anchor.space.top + anchor.space.height - padY, rawY),
  );

  // Keep a minimum leader line length so the badge never obscures the anchor dot
  let targetX = clampedX;
  let targetY = clampedY;
  const dx = targetX - anchor.x;
  const dy = targetY - anchor.y;
  const dist = Math.hypot(dx, dy);
  const minLeader = 4.0;
  if (dist < minLeader) {
    if (dist > 0.01) {
      targetX = anchor.x + (dx / dist) * minLeader;
      targetY = anchor.y + (dy / dist) * minLeader;
    } else {
      targetX = anchor.x + minLeader;
    }
  }

  setActiveCallout({
    id: anchor.id,
    x: targetX,
    y: targetY,
  });
}

export function HomeScreen({
  mode,
  onOpenFolder,
  onOpenProject,
}: HomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
  const calloutAnchors: readonly CalloutAnchor[] =
    mode === 'sound'
      ? CALLOUT_ANCHORS.map((anchor): CalloutAnchor => {
          if (anchor.id === 'digital') {
            return { ...anchor, label: 'RECENT TRACKS', folderId: 'singles' as FolderId };
          }
          if (anchor.id === 'experiments') {
            return { ...anchor, label: 'LATEST PRESS', folderId: 'press' as FolderId };
          }
          return { ...anchor, label: 'EXPERIMENTS', folderId: 'playground' as FolderId };
        })
      : CALLOUT_ANCHORS;
  const highlights =
    mode === 'sound'
      ? SOUND_HIGHLIGHTS.map((item) => ({
          ...item,
          onOpen: () => onOpenFolder(item.folderId),
        }))
      : PROJECT_HIGHLIGHTS.map((item) => ({
          ...item,
          id: item.projectId,
          onOpen: () => onOpenProject(item.projectId),
        }));

  return (
    <section className="desktop__home" aria-label="Portfolio home">
      <div className="home__intro">
        <h1>
          {mode === 'sound' ? (
            <>
              Composing how
              <br />
              sound envisions
            </>
          ) : (
            <>
              Designing how
              <br />
              things feel.
            </>
          )}
        </h1>
        <span className="home__hero-rule" aria-hidden="true" />
      </div>

      <div className="home__callouts" ref={containerRef}>
        <svg
          className="home__callout-lines"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {calloutAnchors.map((anchor) => {
            const active = activeCallout?.id === anchor.id;
            return (
              <line
                key={anchor.id}
                x1={anchor.x * 10}
                y1={anchor.y * 10}
                x2={(active ? activeCallout.x : anchor.endX) * 10}
                y2={(active ? activeCallout.y : anchor.endY) * 10}
              />
            );
          })}
        </svg>

        {calloutAnchors.map((anchor) => {
          const active = activeCallout?.id === anchor.id;
          return (
            <span
              key={`${anchor.id}-anchor`}
              className={`home__callout-anchor-point ${
                active ? 'home__callout-anchor-point--active' : ''
              }`}
              style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
              aria-hidden="true"
            />
          );
        })}

        {calloutAnchors.map((anchor) => (
          <div
            key={anchor.id}
            className={`home__callout-space home__callout-space--${anchor.id}`}
            style={{
              left: `${anchor.space.left}%`,
              top: `${anchor.space.top}%`,
              width: `${anchor.space.width}%`,
              height: `${anchor.space.height}%`,
            }}
            onPointerEnter={(event) =>
              handleSpacePointerMove(
                event,
                anchor,
                containerRef,
                setActiveCallout,
              )
            }
            onPointerMove={(event) =>
              handleSpacePointerMove(
                event,
                anchor,
                containerRef,
                setActiveCallout,
              )
            }
            onPointerLeave={() =>
              setActiveCallout((prev) => (prev?.id === anchor.id ? null : prev))
            }
            onClick={() => onOpenFolder(anchor.folderId)}
            onFocus={() =>
              setActiveCallout({
                id: anchor.id,
                x: anchor.endX,
                y: anchor.endY,
              })
            }
            onBlur={() =>
              setActiveCallout((prev) => (prev?.id === anchor.id ? null : prev))
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenFolder(anchor.folderId);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${anchor.label} projects`}
          />
        ))}

        {calloutAnchors.map((anchor) => {
          const active = activeCallout?.id === anchor.id;
          const posX = active ? activeCallout.x : anchor.endX;
          const posY = active ? activeCallout.y : anchor.endY;

          return (
            <span
              key={`${anchor.id}-badge`}
              className={`home__callout ${
                active ? 'home__callout--active' : ''
              }`}
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
              }}
              aria-hidden="true"
            >
              {anchor.label}
            </span>
          );
        })}
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
        aria-label={mode === 'sound' ? 'Highlights' : 'Project highlights'}
        onMouseEnter={() => setIsHighlightsHovered(true)}
        onMouseLeave={() => setIsHighlightsHovered(false)}
      >
        <button
          type="button"
          className="home__highlights-heading"
          onClick={() => setIsHighlightsPinned((prev) => !prev)}
          aria-expanded={isHighlightsOpen}
          aria-controls="home-highlights-grid"
          aria-label={`Toggle ${mode === 'sound' ? 'Highlights' : 'Project Highlights'} accordion`}
        >
          <span>{mode === 'sound' ? 'Highlights' : 'Project Highlights'}</span>
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
              {highlights.map((project) => (
                <article
                  className="home__highlight"
                  key={project.id}
                  onClick={project.onOpen}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      project.onOpen();
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
                        project.onOpen();
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
