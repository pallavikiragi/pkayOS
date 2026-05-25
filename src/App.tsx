import { useCallback, useEffect, useState } from 'react';
import { AboutWindow } from './components/AboutWindow';
import { BackgroundEffectsPanel } from './components/BackgroundEffectsPanel';
import { BackgroundSlideshow } from './components/BackgroundSlideshow';
import { DEFAULT_BACKGROUND_EFFECTS } from './types/background';
import type { BackgroundEffects } from './types/background';
import { DesktopIcon } from './components/DesktopIcon';
import { DesktopWidgets } from './components/DesktopWidgets';
import { FolderWindow } from './components/FolderWindow';
import { MenuBar } from './components/MenuBar';
import { OSWindow } from './components/OSWindow';
import { ProjectWindow } from './components/ProjectWindow';
import { TrashWindow } from './components/TrashWindow';
import { DESIGN_FOLDERS, SOUND_FOLDERS } from './data/content';
import { useWindowManager } from './hooks/useWindowManager';
import type { FolderId, OSMode } from './types';

function App() {
  const [mode, setMode] = useState<OSMode>('design');
  const [selectedFolder, setSelectedFolder] = useState<FolderId | null>(null);
  const [bgEffects, setBgEffects] = useState<BackgroundEffects>(
    DEFAULT_BACKGROUND_EFFECTS,
  );
  const {
    windows,
    openFolder,
    openProject,
    closeWindow,
    focusWindow,
    startDrag,
    startResize,
    onPointerMove,
    endPointer,
  } = useWindowManager();

  useEffect(() => {
    const onMove = (e: PointerEvent) => onPointerMove(e.clientX, e.clientY);
    const onUp = () => endPointer();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [onPointerMove, endPointer]);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'design' ? 'sound' : 'design'));
  }, []);

  const handleOpenFolder = useCallback(
    (folderId: FolderId) => {
      if (folderId === 'sound') {
        toggleMode();
        return;
      }
      setSelectedFolder(folderId);
      openFolder(folderId);
    },
    [openFolder, toggleMode],
  );

  const handleDesktopClick = useCallback(() => {
    setSelectedFolder(null);
  }, []);

  const currentFolders = mode === 'design' ? DESIGN_FOLDERS : SOUND_FOLDERS;

  return (
    <div className={`pkay-os ${mode === 'sound' ? 'pkay-os--sound' : ''}`} onClick={handleDesktopClick}>
      <BackgroundSlideshow effects={bgEffects} />
      <BackgroundEffectsPanel effects={bgEffects} onChange={setBgEffects} />
      <MenuBar />

      <main className="desktop">
        <aside
          className="desktop__icons"
          onClick={(e) => e.stopPropagation()}
        >
          {currentFolders.map((folder) => (
            <DesktopIcon
              key={folder.id}
              folder={folder}
              selected={selectedFolder === folder.id}
              onOpen={() => handleOpenFolder(folder.id)}
            />
          ))}
        </aside>

        <DesktopWidgets mode={mode} onOpenProject={openProject} />

        <div className="desktop__workspace" onClick={(e) => e.stopPropagation()}>
          {windows.map((win) => {
            const isFolder = win.kind === 'folder' && win.folderId;
            const isProject = win.kind === 'project' && win.projectId;
            const variant =
              win.kind === 'project'
                ? 'project'
                : win.kind === 'folder'
                  ? 'folder'
                  : 'default';

            return (
              <OSWindow
                key={win.id}
                window={win}
                variant={variant}
                status={
                  win.kind === 'folder'
                    ? `ITEMS: ${win.folderId ? 'FILTERABLE' : '0'} | MODE: READ`
                    : win.kind === 'project'
                      ? 'CHARS: CASE STUDY | LINE: — | COL: 1'
                      : 'SYS: READY'
                }
                onClose={() => closeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onDragStart={(x, y) => startDrag(win.id, x, y)}
                onResizeStart={(edge, x, y) =>
                  startResize(win.id, edge, x, y)
                }
              >
                {isFolder && (
                  <FolderWindow
                    folderId={win.folderId!}
                    onOpenProject={openProject}
                  />
                )}
                {isProject && (
                  <ProjectWindow projectId={win.projectId!} />
                )}
                {win.kind === 'about' && <AboutWindow />}
                {win.kind === 'trash' && <TrashWindow />}
              </OSWindow>
            );
          })}
        </div>

        <footer className="desktop__footer">
          <span>{mode === 'design' ? 'INTERACTION · SYSTEMS · MEDIA · ENTERPRISE' : 'ALBUMS · SINGLES · PRESS · MIXES'}</span>
          <span className="desktop__footer-id">PALLAVI OS — {mode === 'design' ? 'DESIGN WORKSTATION' : 'SOUND STATION'}</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
