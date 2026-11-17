import { useCallback, useEffect, useState } from 'react';
import { AboutWindow } from './components/AboutWindow';
import { BackgroundReveal } from './components/BackgroundReveal';
import { FolderWindow } from './components/FolderWindow';
import { HomeScreen } from './components/HomeScreen';
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
import { ProfilePage } from './components/ProfilePage';
import { useWindowManager } from './hooks/useWindowManager';
import type { FolderId, OSMode } from './types';

function App() {
  const [mode, setMode] = useState<OSMode>('design');
  const [activePage, setActivePage] = useState<'home' | 'profile'>('home');
  const {
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
      openFolder(folderId);
    },
    [openFolder, toggleMode],
  );

  const handleOpenPage = useCallback(
    (
      kind: Parameters<typeof openPage>[0],
      archiveType?: Parameters<typeof openPage>[1],
    ) => {
      setActivePage('home');
      openPage(kind, archiveType);
    },
    [openPage],
  );

  return (
    <div className={`pkay-os ${mode === 'sound' ? 'pkay-os--sound' : ''}`}>
      <BackgroundReveal />
      <MenuBar
        mode={mode}
        activePage={activePage}
        onOpenPage={handleOpenPage}
        onToggleMode={toggleMode}
        onShowHome={() => setActivePage('home')}
        onShowProfile={() => setActivePage('profile')}
      />

      <main className="desktop">
        {activePage === 'home' ? (
          <>
            <HomeScreen
              mode={mode}
              onOpenFolder={handleOpenFolder}
              onOpenProject={openProject}
            />

            <div
              className="desktop__workspace"
              onClick={(e) => e.stopPropagation()}
            >
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
                    onMinimize={() => minimizeWindow(win.id)}
                    onToggleMaximize={() => toggleMaximize(win.id)}
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
                    {win.kind === 'archive' && (
                      <ArchivePage
                        type={win.archiveType!}
                        onOpenProject={openProject}
                      />
                    )}
                    {win.kind === 'experiments' && <ExperimentsPage />}
                    {win.kind === 'collaborations' && (
                      <CollaborationsPage onOpenProject={openProject} />
                    )}
                    {win.kind === 'socials' && <SocialsPage />}
                    {win.kind === 'contact' && <ContactPage />}
                    {win.kind === 'clients' && (
                      <ClientsPage onOpenProject={openProject} />
                    )}
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
              <span>
                {mode === 'design'
                  ? 'INTERACTION · SYSTEMS · MEDIA · ENTERPRISE'
                  : 'ALBUMS · SINGLES · PRESS · MIXES'}
              </span>
              <div className="desktop__minimized-windows" aria-label="Minimized windows">
                {windows.filter((win) => win.isMinimized).map((win) => (
                  <button
                    key={win.id}
                    type="button"
                    onClick={() => restoreWindow(win.id)}
                    aria-label={`Restore ${win.title}`}
                    title={`Restore ${win.title}`}
                  >
                    {win.title}
                  </button>
                ))}
              </div>
              <span className="desktop__footer-id">
                PALLAVI OS —{' '}
                {mode === 'design' ? 'DESIGN WORKSTATION' : 'SOUND STATION'}
              </span>
            </footer>
          </>
        ) : (
          <ProfilePage onClose={() => setActivePage('home')} />
        )}
      </main>
    </div>
  );
}

export default App;
