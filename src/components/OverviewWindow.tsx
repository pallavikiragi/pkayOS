import type { ReactNode } from 'react';
import type { WidgetLayout } from '../data/widgets';

interface OverviewWindowProps {
  title?: string;
  layout: WidgetLayout;
  variant?: 'default' | 'document' | 'minimal' | 'highlights';
  headerActions?: ReactNode;
  children: ReactNode;
}

export function OverviewWindow({
  title = '',
  layout,
  variant = 'default',
  headerActions,
  children,
}: OverviewWindowProps) {
  const isMinimal = variant === 'minimal';
  const isDocument = variant === 'document';
  const isHighlights = variant === 'highlights';
  const showHeader = !isMinimal && (title || headerActions);

  return (
    <article
      className={`overview-window ${isDocument ? 'overview-window--document' : ''} ${isMinimal ? 'overview-window--minimal' : ''} ${isHighlights ? 'overview-window--highlights' : ''}`}
      style={{
        left: layout.x,
        top: layout.y,
        width: layout.width,
        height: layout.height,
      }}
      aria-label={title || 'Desktop widget'}
    >
      {showHeader && (
        <header className="overview-window__titlebar">
          {title ? (
            <span className="overview-window__title">{title}</span>
          ) : (
            <span className="overview-window__title overview-window__title--empty" />
          )}
          {headerActions}
        </header>
      )}
      <div
        className={`overview-window__body ${isMinimal ? 'overview-window__body--flush' : ''}`}
      >
        {children}
      </div>
    </article>
  );
}
