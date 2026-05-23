import {
  RELEASE_NOTES_META,
  RELEASE_NOTES_POINTS,
} from '../data/releaseNotes';

interface ReleaseNotesContentProps {
  compact?: boolean;
}

export function ReleaseNotesContent({ compact = false }: ReleaseNotesContentProps) {
  const points = compact
    ? RELEASE_NOTES_POINTS.slice(0, 7)
    : RELEASE_NOTES_POINTS;

  return (
    <article
      className={`case-study release-notes-doc ${compact ? 'release-notes-doc--compact' : ''}`}
    >
      <div className="case-study__guides" aria-hidden>
        <span className="case-study__margin-left">CHANGELOG</span>
        <span className="case-study__margin-right">SYS.LOG</span>
      </div>

      <header className="case-study__header">
        <p>SUBJECT: {RELEASE_NOTES_META.subject}</p>
        <p>DATE: {RELEASE_NOTES_META.date}</p>
        <p>STATUS: {RELEASE_NOTES_META.status}</p>
      </header>

      <hr className="case-study__rule" />

      <ul className="release-notes-list">
        {points.map((point) => (
          <li key={point} className="release-notes-list__item">
            {point}
          </li>
        ))}
      </ul>

      {!compact && (
        <p className="release-notes-doc__footer doc-body">
          → More entries load inside MEMORY menu when archive expands.
        </p>
      )}
    </article>
  );
}
