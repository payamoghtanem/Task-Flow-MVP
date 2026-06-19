import { useState } from 'react';
import { api } from '../services/api';

const STATUS_ICONS = { TODO: '●', IN_PROGRESS: '◑', DONE: '✓' };
const STATUS_CSS = { TODO: 'todo', IN_PROGRESS: 'in-progress', DONE: 'done' };

export default function TaskCard({ task, onStatusUpdate, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStatusChange(newStatus) {
    setIsUpdating(true);
    try {
      const { data } = await api.patch(`/tasks/${task.id}`, { status: newStatus });
      onStatusUpdate(data);
    } catch (err) {
      console.error('Status update failed:', err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      onDelete(task.id);
    } catch (err) {
      console.error('Delete failed:', err.message);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  const isDone = task.status === 'DONE';
  const isInProgress = task.status === 'IN_PROGRESS';
  const cssState = STATUS_CSS[task.status];

  return (
    <article className={`task-card${isInProgress ? ' task-card--in-progress' : ''}${isDone ? ' task-card--done' : ''}`}>
      <div className="task-card-top">
        <span
          className={`task-status-icon task-status-icon--${cssState}`}
          aria-hidden="true"
        >
          {STATUS_ICONS[task.status]}
        </span>

        <span className={`task-title${isDone ? ' task-title--done' : ''}`}>
          {task.title}
        </span>

        <div className="task-badges">
          <span className={`badge badge--${task.category.toLowerCase()}`}>
            {task.category}
          </span>
          <span className="badge badge--timeframe">{task.timeframe}</span>
        </div>
      </div>

      {!showDeleteConfirm && (
        <div className="task-actions">
          {task.status === 'TODO' && (
            <button
              className="btn btn--action"
              onClick={() => handleStatusChange('IN_PROGRESS')}
              disabled={isUpdating}
              aria-label={`Start task: ${task.title}`}
            >
              ○ Start
            </button>
          )}
          {!isDone && (
            <button
              className="btn btn--action"
              onClick={() => handleStatusChange('DONE')}
              disabled={isUpdating}
              aria-label={`Mark done: ${task.title}`}
            >
              ✓ Mark Done
            </button>
          )}
          <button
            className="btn btn--action btn--action-delete"
            onClick={() => setShowDeleteConfirm(true)}
            aria-label={`Delete task: ${task.title}`}
          >
            🗑 Delete
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p className="delete-confirm-text">
            Delete &ldquo;{task.title}&rdquo;? This cannot be undone.
          </p>
          <div className="delete-confirm-actions">
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="btn btn--danger btn--sm"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label={`Confirm delete ${task.title}`}
              aria-busy={isDeleting ? 'true' : undefined}
            >
              {isDeleting ? 'Deleting…' : 'Yes, delete'}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
