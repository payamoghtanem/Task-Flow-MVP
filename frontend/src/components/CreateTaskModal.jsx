import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import FormField from './FormField';

const CATEGORIES = [
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'PROFESSIONAL', label: 'Professional' },
];

const TIMEFRAMES = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];

export default function CreateTaskModal({ onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [titleError, setTitleError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();

    function getFocusable() {
      return Array.from(
        modalRef.current?.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    }

    function handleKey(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') {
        const els = getFocusable();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const trimmed = title.trim();
    if (!trimmed) {
      setTitleError('Task title is required');
      titleRef.current?.focus();
      return;
    }
    setTitleError(null);

    setIsLoading(true);
    try {
      const { data } = await api.post('/tasks', { title: trimmed, category, timeframe });
      onCreated(data);
    } catch (err) {
      setApiError(err.message || 'Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmit = title.trim().length > 0 && category && timeframe && !isLoading;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Add a new task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {apiError && <div role="alert" className="api-error">{apiError}</div>}

            <FormField label="Task title" error={titleError} id="task-title">
              <input
                ref={titleRef}
                id="task-title"
                type="text"
                className={`form-input${titleError ? ' form-input--error' : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError) setTitleError(null);
                }}
                maxLength={100}
                placeholder="What do you need to do?"
              />
            </FormField>
            <p className="char-count" aria-live="polite">{title.length}/100 characters</p>

            <fieldset className="radio-group form-field">
              <legend className="radio-legend">Category</legend>
              <div className="radio-options">
                {CATEGORIES.map((cat) => (
                  <label key={cat.value} className="radio-option">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={category === cat.value}
                      onChange={() => setCategory(cat.value)}
                    />
                    <span
                      className={`category-dot category-dot--${cat.value.toLowerCase()}`}
                      aria-hidden="true"
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="radio-group form-field">
              <legend className="radio-legend">Time horizon</legend>
              <div className="radio-options">
                {TIMEFRAMES.map((tf) => (
                  <label key={tf.value} className="radio-option">
                    <input
                      type="radio"
                      name="timeframe"
                      value={tf.value}
                      checked={timeframe === tf.value}
                      onChange={() => setTimeframe(tf.value)}
                    />
                    {tf.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!canSubmit}
              aria-busy={isLoading ? 'true' : undefined}
            >
              {isLoading ? 'Adding…' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
