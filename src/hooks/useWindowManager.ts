import { useCallback, useRef, useState } from 'react';
import type { FolderId, OSWindow, WindowKind } from '../types';
import { FOLDERS, getProject } from '../data/content';
import {
  applyResize,
  centerPosition,
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
  const pos =
    partial.x !== undefined && partial.y !== undefined
      ? { x: partial.x, y: partial.y }
      : partial.kind === 'project'
        ? centerPosition(size.width, size.height)
        : nextPosition();

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

  const openFolder = useCallback(
    (folderId: FolderId) => {
      if (folderId === 'about') {
        const id = makeId('about', 'main');
        setWindows((prev) => {
          if (prev.find((w) => w.id === id)) return prev;
          zCounter += 1;
          return [
            ...prev,
            createWindow({
              id,
              kind: 'about',
              title: 'ABOUT.TXT',
              zIndex: zCounter,
            }),
          ];
        });
        setTimeout(() => bringToFront(id), 0);
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
    [bringToFront],
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
  }, []);

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
    closeWindow,
    focusWindow,
    startDrag,
    startResize,
    onPointerMove,
    endPointer,
  };
}
