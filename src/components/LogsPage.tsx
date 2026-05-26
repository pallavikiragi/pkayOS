import { ReleaseNotesContent } from './ReleaseNotesContent';

export function LogsPage() {
  return (
    <div className="logs-page">
      <header className="logs-header">
        <h2>SYSTEM_LOGS</h2>
        <span className="logs-tag">VERSION: 8.4.2</span>
      </header>
      <div className="logs-content">
        <ReleaseNotesContent />
      </div>
    </div>
  );
}
