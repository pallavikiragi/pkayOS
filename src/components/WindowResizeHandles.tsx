import type { ResizeHandle } from '../utils/windowGeometry';

const HANDLES: ResizeHandle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

interface WindowResizeHandlesProps {
  onResizeStart: (edge: ResizeHandle, clientX: number, clientY: number) => void;
}

export function WindowResizeHandles({ onResizeStart }: WindowResizeHandlesProps) {
  return (
    <>
      {HANDLES.map((edge) => (
        <div
          key={edge}
          className={`os-window__resize os-window__resize--${edge}`}
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            e.stopPropagation();
            e.preventDefault();
            onResizeStart(edge, e.clientX, e.clientY);
          }}
        />
      ))}
    </>
  );
}
