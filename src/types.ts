export type OSMode = 'design' | 'sound';

export interface MenuItem {
  label: string;
  items?: string[];
  isBold?: boolean;
}

export type FolderId =
  | 'experiments'
  | 'playground'
  | 'emerging-media'
  | 'digital-interfaces'
  | 'branding-strategy'
  | 'information-graphics'
  | 'spatial-design'
  | 'sound'
  | 'about'
  | 'trash'
  | 'albums'
  | 'singles'
  | 'press'
  | 'dj-mixes'
  | 'film-score';

export interface CaseStudySection {
  id: string;
  label: string;
  content: string | string[];
  type: 'text' | 'list' | 'numbered-list' | 'image' | 'embed';
  image?: string;
  embedUrl?: string;
}

export interface Project {
  id: string;
  folderId: FolderId;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  summary: string;
  role: string;
  tools: string[];
  outcomes: string[];
  image: string;
  sections?: CaseStudySection[];
}

export interface FolderMeta {
  id: FolderId;
  label: string;
  icon: 'folder' | 'doc' | 'trash' | 'info' | 'gesture' | 'interface' | 'palette' | 'chart' | 'cube';
  description: string;
}

export type WindowKind = 'folder' | 'project' | 'about' | 'trash' | 'archive' | 'experiments' | 'collaborations' | 'socials' | 'contact' | 'clients' | 'resume' | 'journey' | 'logs' | 'inspirations' | 'writings';

export interface OSWindow {
  id: string;
  kind: WindowKind;
  title: string;
  folderId?: FolderId;
  projectId?: string;
  archiveType?: 'all' | 'feature' | 'studio';
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}
