import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import arrowEndDark from '../assets/figma/buttons/arrow-end-dark.svg';

/**
 * Bottom-right Post-it note CTA that opens a centered sticky-note composer
 * and displays a bottom OS notification window once a note is submitted.
 */
export function NoteWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 10);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!showNotification) return;

    const dismissTimer = window.setTimeout(() => {
      setShowNotification(false);
    }, 4500);

    return () => window.clearTimeout(dismissTimer);
  }, [showNotification]);

  const handleSubmit = () => {
    if (!noteText.trim()) return;
    setNoteText('');
    setIsOpen(false);
    setShowNotification(true);
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const canSend = noteText.trim().length > 0;

  return (
    <>
      <button
        type="button"
        className="note-cta"
        onClick={() => setIsOpen(true)}
        aria-label="Add a note for Pallavi"
      >
        <span className="note-cta__strip" aria-hidden="true" />
        <span className="note-cta__content">
          <span className="note-cta__title">+ ADD A NOTE</span>
          <span className="note-cta__subtitle">LEAVE A STICKY</span>
        </span>
      </button>

      {isOpen && (
        <div
          className="note-modal-backdrop"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="postit-note"
            role="dialog"
            aria-modal="true"
            aria-labelledby="postit-note-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="postit-note__header">
              <span id="postit-note-title" className="postit-note__label">
                NOTE // FOR PALLAVI
              </span>
              <button
                type="button"
                className="postit-note__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close note"
              >
                ×
              </button>
            </header>

            <div className="postit-note__body">
              <textarea
                ref={textareaRef}
                className="postit-note__input"
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Type a comment..."
                aria-label="Type a comment"
                rows={5}
              />
            </div>

            <footer className="postit-note__footer">
              <button
                type="button"
                className="design-button design-button--compact postit-note__send"
                onClick={handleSubmit}
                disabled={!canSend}
                aria-label="Send note"
                title="Send note (Enter)"
              >
                <img
                  className="postit-note__send-arrow"
                  src={arrowEndDark}
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <span className="postit-note__hint" aria-hidden="true">
                ENTER ↵ TO SEND
              </span>
            </footer>
          </div>
        </div>
      )}

      {showNotification && (
        <aside
          className="note-toast"
          role="status"
          aria-live="polite"
          aria-label="Note notification"
        >
          <header className="note-toast__header">
            <span className="note-toast__title-group">
              <span className="note-toast__dot" aria-hidden="true" />
              <span>NOTE DISPATCHED</span>
            </span>
            <button
              type="button"
              className="note-toast__close"
              onClick={() => setShowNotification(false)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </header>
          <p className="note-toast__body">
            Thanks! Your note has been pinned to Pallavi&apos;s desk.
          </p>
        </aside>
      )}
    </>
  );
}
