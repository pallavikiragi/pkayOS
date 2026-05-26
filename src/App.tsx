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
import { ArchivePage } from './components/ArchivePage';
import { ExperimentsPage } from './components/ExperimentsPage';
import { CollaborationsPage } from './components/CollaborationsPage';
import { SocialsPage } from './components/SocialsPage';
import { ContactPage } from './components/ContactPage';
import { ClientsPage } from './components/ClientsPage';
import { ResumePage } from './components/ResumePage';
import { JourneyPage } from './components/JourneyPage';
import { LogsPage } from './components/LogsPage';
import { InspirationsPage } from './components/InspirationsPage';
import { WritingsPage } from './components/WritingsPage';
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
    openPage,
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
      {/* <BackgroundEffectsPanel effects={bgEffects} onChange={setBgEffects} /> */}
      <MenuBar mode={mode} onOpenPage={openPage} />

      <main className="desktop">
        <aside
          className="desktop__icons"
          onClick={(e) => e.stopPropagation()}
        >
          {currentFolders.map((folder) => {
            if (!folder.label) {
              return <div key={folder.id} className="desktop-icon" style={{ visibility: 'hidden', pointerEvents: 'none' }} />;
            }
            return (
              <DesktopIcon
                key={folder.id}
                folder={folder}
                selected={selectedFolder === folder.id}
                onOpen={() => handleOpenFolder(folder.id)}
              />
            );
          })}
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
                {win.kind === 'archive' && <ArchivePage type={win.archiveType!} onOpenProject={openProject} />}
                {win.kind === 'experiments' && <ExperimentsPage />}
                {win.kind === 'collaborations' && <CollaborationsPage onOpenProject={openProject} />}
                {win.kind === 'socials' && <SocialsPage />}
                {win.kind === 'contact' && <ContactPage />}
                {win.kind === 'clients' && <ClientsPage onOpenProject={openProject} />}
                {win.kind === 'resume' && <ResumePage />}
                {win.kind === 'journey' && <JourneyPage />}
                {win.kind === 'logs' && <LogsPage />}
                {win.kind === 'inspirations' && <InspirationsPage />}
                {win.kind === 'writings' && <WritingsPage />}
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
