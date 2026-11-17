import { useCallback, useRef, useState } from 'react';
import type { FolderId, OSWindow, WindowKind } from '../types';
import { FOLDERS, getProject } from '../data/content';
import {
  applyResize,
  getDefaultSize,
  getMinSize,
  getViewportBounds,
  type ResizeHandle,
} from '../utils/windowGeometry';

let zCounter = 10;
let cascade = 0;

function nextPosition() {
  const offset = (cascade % 6) * 28;
  cascade += 1;
  return { x: 72 + offset, y: 88 + offset };
}

function makeId(kind: WindowKind, key: string) {
  return `${kind}-${key}`;
}

function createWindow(
  partial: Omit<OSWindow, 'width' | 'height' | 'x' | 'y'> & {
    kind: WindowKind;
    x?: number;
    y?: number;
  },
): OSWindow {
  const size = getDefaultSize(partial.kind);

  let defaultX: number;
  let defaultY: number;

  if (partial.kind === 'project') {
    // Occupies 3/4 width and full height, centered horizontally, starts directly below menu bar
    defaultX = Math.max(0, Math.round((window.innerWidth - size.width) / 2));
    defaultY = 28;
  } else if (partial.kind === 'folder') {
    // Match the reference grid popup size and center it in the viewport.
    defaultX = Math.max(0, Math.round((window.innerWidth - size.width) / 2));
    defaultY = Math.max(28, Math.round(28 + (window.innerHeight - 28 - size.height) / 2));
  } else {
    const next = nextPosition();
    defaultX = next.x;
    defaultY = next.y;
  }

  const pos =
    partial.x !== undefined && partial.y !== undefined
      ? { x: partial.x, y: partial.y }
      : { x: defaultX, y: defaultY };

  return {
    ...partial,
    x: pos.x,
    y: pos.y,
    width: size.width,
    height: size.height,
  };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<OSWindow[]>([]);
  const restoreBoundsRef = useRef(
    new Map<string, Pick<OSWindow, 'x' | 'y' | 'width' | 'height'>>(),
  );
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const resizeRef = useRef<{
    id: string;
    edge: ResizeHandle;
    startX: number;
    startY: number;
    origin: { x: number; y: number; width: number; height: number };
    kind: WindowKind;
  } | null>(null);

  const bringToFront = useCallback((id: string) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w)),
    );
  }, []);

  const openPage = useCallback(
    (kind: WindowKind, archiveType?: OSWindow['archiveType']) => {
      const id = archiveType ? makeId(kind, archiveType) : makeId(kind, 'main');
      const titles: Record<string, string> = {
        archive: archiveType === 'all' ? 'ALL_PROJECTS.INDEX' : archiveType === 'feature' ? 'FEATURED_WORK.INDEX' : 'STUDIO_WORK.INDEX',
        experiments: 'EXPERIMENTS.GALLERY',
        collaborations: 'COLLABORATIONS.GALLERY',
        socials: 'SOCIALS.POPUP',
        contact: 'CONTACT.POPUP',
        clients: 'CLIENTS.GALLERY',
        resume: 'RESUME.PDF',
        journey: 'JOURNEY.ROADMAP',
        logs: 'LOGS.RELEASE_NOTES',
        inspirations: 'INSPIRATIONS.MOODBOARD',
        writings: 'WRITINGS.BLOG',
        about: 'ABOUT.TXT',
      };

      setWindows((prev) => {
        if (prev.find((w) => w.id === id)) return prev;
        zCounter += 1;
        return [
          ...prev,
          createWindow({
            id,
            kind,
            title: titles[kind] || kind.toUpperCase(),
            archiveType,
            zIndex: zCounter,
          }),
        ];
      });
      setTimeout(() => bringToFront(id), 0);
    },
    [bringToFront],
  );

  const openFolder = useCallback(
    (folderId: FolderId) => {
      if (folderId === 'about') {
        openPage('about');
        return;
      }

      if (folderId === 'trash') {
        const id = makeId('trash', 'main');
        setWindows((prev) => {
          if (prev.find((w) => w.id === id)) return prev;
          zCounter += 1;
          return [
            ...prev,
            createWindow({
              id,
              kind: 'trash',
              title: 'TRASH',
              zIndex: zCounter,
            }),
          ];
        });
        setTimeout(() => bringToFront(id), 0);
        return;
      }

      const folder = FOLDERS.find((f) => f.id === folderId);
      const id = makeId('folder', folderId);
      setWindows((prev) => {
        if (prev.find((w) => w.id === id)) return prev;
        zCounter += 1;
        return [
          ...prev,
          createWindow({
            id,
            kind: 'folder',
            title: folder?.label ?? 'FOLDER',
            folderId,
            zIndex: zCounter,
          }),
        ];
      });
      setTimeout(() => bringToFront(id), 0);
    },
    [bringToFront, openPage],
  );

  const openProject = useCallback(
    (projectId: string) => {
      const project = getProject(projectId);
      if (!project) return;
      const id = makeId('project', projectId);
      setWindows((prev) => {
        if (prev.find((w) => w.id === id)) return prev;
        zCounter += 1;
        return [
          ...prev,
          createWindow({
            id,
            kind: 'project',
            title: `${project.title}.CASE`,
            projectId,
            zIndex: zCounter,
          }),
        ];
      });
      setTimeout(() => bringToFront(id), 0);
    },
    [bringToFront],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    restoreBoundsRef.current.delete(id);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  }, []);

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)),
      );
      bringToFront(id);
    },
    [bringToFront],
  );

  const toggleMaximize = useCallback(
    (id: string) => {
      const current = windows.find((w) => w.id === id);
      if (!current) return;

      if (current.isMaximized) {
        const bounds = restoreBoundsRef.current.get(id);
        if (!bounds) return;
        restoreBoundsRef.current.delete(id);
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, ...bounds, isMaximized: false } : w,
          ),
        );
      } else {
        restoreBoundsRef.current.set(id, {
          x: current.x,
          y: current.y,
          width: current.width,
          height: current.height,
        });
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id
              ? {
                  ...w,
                  x: 0,
                  y: 0,
                  width: window.innerWidth,
                  height: Math.max(200, window.innerHeight - 50 - 24),
                  isMaximized: true,
                }
              : w,
          ),
        );
      }
      bringToFront(id);
    },
    [windows, bringToFront],
  );

  const focusWindow = useCallback(
    (id: string) => {
      bringToFront(id);
    },
    [bringToFront],
  );

  const startDrag = useCallback(
    (id: string, clientX: number, clientY: number) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      bringToFront(id);
      dragRef.current = {
        id,
        startX: clientX,
        startY: clientY,
        originX: win.x,
        originY: win.y,
      };
    },
    [windows, bringToFront],
  );

  const startResize = useCallback(
    (id: string, edge: ResizeHandle, clientX: number, clientY: number) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      bringToFront(id);
      resizeRef.current = {
        id,
        edge,
        startX: clientX,
        startY: clientY,
        origin: { x: win.x, y: win.y, width: win.width, height: win.height },
        kind: win.kind,
      };
    },
    [windows, bringToFront],
  );

  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    const drag = dragRef.current;
    if (drag) {
      const dx = clientX - drag.startX;
      const dy = clientY - drag.startY;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === drag.id
            ? { ...w, x: drag.originX + dx, y: drag.originY + dy }
            : w,
        ),
      );
      return;
    }

    const resize = resizeRef.current;
    if (!resize) return;

    const dx = clientX - resize.startX;
    const dy = clientY - resize.startY;
    const min = getMinSize(resize.kind);
    const { maxW, maxH } = getViewportBounds();

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== resize.id) return w;
        return {
          ...w,
          ...applyResize(
            resize.edge,
            resize.origin,
            dx,
            dy,
            min.width,
            min.height,
            maxW,
            maxH,
          ),
        };
      }),
    );
  }, []);

  const endPointer = useCallback(() => {
    dragRef.current = null;
    resizeRef.current = null;
  }, []);

  return {
    windows,
    openFolder,
    openProject,
    openPage,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximize,
    focusWindow,
    startDrag,
    startResize,
    onPointerMove,
    endPointer,
  };
}
