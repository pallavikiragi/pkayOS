import type { ReactNode } from 'react';
import type { OSWindow as OSWindowType } from '../types';
import type { ResizeHandle } from '../utils/windowGeometry';
import { WindowResizeHandles } from './WindowResizeHandles';

interface OSWindowProps {
  window: OSWindowType;
  children: ReactNode;
  status?: string;
  variant?: 'default' | 'folder' | 'project';
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  onDragStart: (clientX: number, clientY: number) => void;
  onResizeStart: (edge: ResizeHandle, clientX: number, clientY: number) => void;
}

export function OSWindow({
  window: win,
  children,
  status,
  variant = 'default',
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onDragStart,
  onResizeStart,
}: OSWindowProps) {
  const isProject = variant === 'project';

  return (
    <section
      className={`os-window os-window--${variant}${win.isMaximized ? ' os-window--maximized' : ''}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        display: win.isMinimized ? 'none' : undefined,
      }}
      onMouseDown={onFocus}
      role="dialog"
      aria-label={win.title}
    >
      <div className="os-window__titlebar">
        <button
          type="button"
          className="os-window__close"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClose();
          }}
          aria-label="Close window"
        >×</button>
        <div
          className="os-window__titlebar-drag"
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            const el = e.currentTarget;
            el.setPointerCapture(e.pointerId);
            onDragStart(e.clientX, e.clientY);
            const release = () => {
              if (el.hasPointerCapture(e.pointerId)) {
                el.releasePointerCapture(e.pointerId);
              }
              el.removeEventListener('pointerup', release);
              el.removeEventListener('pointercancel', release);
            };
            el.addEventListener('pointerup', release);
            el.addEventListener('pointercancel', release);
          }}
        >
          <span className="os-window__title">{win.title}</span>
        </div>
        <div className="os-window__controls">
          <button
            type="button"
            className="os-window__control os-window__minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize window"
            title="Minimize"
          />
          <button
            type="button"
            className={`os-window__control os-window__maximize${win.isMaximized ? ' os-window__maximize--active' : ''}`}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            aria-label={win.isMaximized ? 'Restore window' : 'Maximize window'}
            title={win.isMaximized ? 'Restore' : 'Maximize'}
          />
        </div>
      </div>
      <div
        className={`os-window__body ${isProject ? 'os-window__body--readable' : ''}`}
      >
        {children}
      </div>
      {status && <footer className="os-window__status">{status}</footer>}

      <WindowResizeHandles onResizeStart={onResizeStart} />
    </section>
  );
}
