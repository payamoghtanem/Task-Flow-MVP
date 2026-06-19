import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import TaskCard from './TaskCard';

vi.mock('../services/api', () => ({
  api: {
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { api } from '../services/api';

const TODO_TASK = { id: 't1', title: 'Write tests', category: 'PERSONAL', timeframe: 'DAILY', status: 'TODO' };
const IN_PROGRESS_TASK = { ...TODO_TASK, status: 'IN_PROGRESS' };
const DONE_TASK = { ...TODO_TASK, status: 'DONE' };

beforeEach(() => vi.clearAllMocks());

describe('TaskCard — TODO state', () => {
  test('renders task title', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('shows category and timeframe badges', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('PERSONAL')).toBeInTheDocument();
    expect(screen.getByText('DAILY')).toBeInTheDocument();
  });

  test('shows Start button', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /start task/i })).toBeInTheDocument();
  });

  test('shows Mark Done button', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /mark done/i })).toBeInTheDocument();
  });

  test('Start button calls api.patch with IN_PROGRESS and triggers onStatusUpdate', async () => {
    const onStatusUpdate = vi.fn();
    const updated = { ...TODO_TASK, status: 'IN_PROGRESS' };
    api.patch.mockResolvedValueOnce({ data: updated });

    render(<TaskCard task={TODO_TASK} onStatusUpdate={onStatusUpdate} onDelete={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /start task/i }));

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/tasks/t1', { status: 'IN_PROGRESS' });
      expect(onStatusUpdate).toHaveBeenCalledWith(updated);
    });
  });

  test('Mark Done button calls api.patch with DONE', async () => {
    const onStatusUpdate = vi.fn();
    const updated = { ...TODO_TASK, status: 'DONE' };
    api.patch.mockResolvedValueOnce({ data: updated });

    render(<TaskCard task={TODO_TASK} onStatusUpdate={onStatusUpdate} onDelete={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /mark done/i }));

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/tasks/t1', { status: 'DONE' });
      expect(onStatusUpdate).toHaveBeenCalledWith(updated);
    });
  });
});

describe('TaskCard — IN_PROGRESS state', () => {
  test('does not show Start button', () => {
    render(<TaskCard task={IN_PROGRESS_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.queryByRole('button', { name: /start task/i })).toBeNull();
  });

  test('shows Mark Done button', () => {
    render(<TaskCard task={IN_PROGRESS_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /mark done/i })).toBeInTheDocument();
  });

  test('shows Delete button', () => {
    render(<TaskCard task={IN_PROGRESS_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /delete task/i })).toBeInTheDocument();
  });
});

describe('TaskCard — DONE state', () => {
  test('does not show Start or Mark Done buttons', () => {
    render(<TaskCard task={DONE_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.queryByRole('button', { name: /start task/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /mark done/i })).toBeNull();
  });

  test('shows Delete button', () => {
    render(<TaskCard task={DONE_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('button', { name: /delete task/i })).toBeInTheDocument();
  });
});

describe('TaskCard — delete flow', () => {
  test('clicking Delete shows inline confirmation', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();
  });

  test('Cancel hides the confirmation', () => {
    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));
    expect(screen.queryByText(/cannot be undone/i)).toBeNull();
  });

  test('Confirm delete calls api.delete and onDelete', async () => {
    const onDelete = vi.fn();
    api.delete.mockResolvedValueOnce({});

    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm delete/i }));

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/tasks/t1');
      expect(onDelete).toHaveBeenCalledWith('t1');
    });
  });

  test('failed delete resets confirmation without calling onDelete', async () => {
    const onDelete = vi.fn();
    api.delete.mockRejectedValueOnce(new Error('Network error'));

    render(<TaskCard task={TODO_TASK} onStatusUpdate={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm delete/i }));

    await waitFor(() => {
      expect(onDelete).not.toHaveBeenCalled();
    });
  });
});
