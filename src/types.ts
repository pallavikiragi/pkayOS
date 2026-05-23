export type FolderId =
  | 'ux-systems'
  | 'interactive-media'
  | 'sound'
  | 'experiments'
  | 'playground'
  | 'about'
  | 'trash';

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
}

export interface FolderMeta {
  id: FolderId;
  label: string;
  icon: 'folder' | 'doc' | 'trash' | 'info';
  description: string;
}

export type WindowKind = 'folder' | 'project' | 'about' | 'trash';

export interface OSWindow {
  id: string;
  kind: WindowKind;
  title: string;
  folderId?: FolderId;
  projectId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}
