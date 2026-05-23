import { PROJECTS } from './content';

export interface WidgetLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DesktopWidget {
  id: string;
  title: string;
  layout: WidgetLayout;
}

export const DESKTOP_WIDGETS: DesktopWidget[] = [
  {
    id: 'latest-artwork',
    title: '',
    layout: { x: 28, y: 28, width: 200, height: 200 },
  },
  {
    id: 'latest-music',
    title: '',
    layout: { x: 240, y: 28, width: 300, height: 152 },
  },
  {
    id: 'release-notes',
    title: 'RELEASE NOTES.TXT',
    layout: { x: 28, y: 240, width: 296, height: 288 },
  },
  {
    id: 'project-highlights',
    title: 'PROJECT HIGHLIGHTS',
    layout: { x: 336, y: 240, width: 300, height: 368 },
  },
];

/** Example Spotify embed — replace with your track URI */
export const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/track/5CSK1s9eDKRRkd0b9rqAM0?utm_source=generator&theme=0';

const artwork = PROJECTS.find((p) => p.id === 'generative-visuals')!;

export const WIDGET_ARTWORK = {
  image: artwork.image,
  projectId: artwork.id,
};

export const WIDGET_HIGHLIGHT_IDS = [
  'airport-cyberculture',
  'orange-business',
  'noise-cluster',
  'going-places',
  'deloitte',
  'generative-visuals',
] as const;

export function getHighlightProjects() {
  return WIDGET_HIGHLIGHT_IDS.map(
    (id) => PROJECTS.find((p) => p.id === id)!,
  );
}
