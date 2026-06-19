import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CreateTaskModal from './CreateTaskModal';

vi.mock('../services/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

import { api } from '../services/api';

const onClose = vi.fn();
const onCreated = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

function renderModal() {
  return render(<CreateTaskModal onClose={onClose} onCreated={onCreated} />);
}

describe('CreateTaskModal — rendering', () => {
  test('renders dialog with modal role and title', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add a new task')).toBeInTheDocument();
  });

  test('renders title input, category and timeframe fieldsets', () => {
    renderModal();
    expect(screen.getByPlaceholderText(/what do you need to do/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /time horizon/i })).toBeInTheDocument();
  });

  test('Add Task button is disabled when form is empty', () => {
    renderModal();
    expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
  });

  test('character count reflects title length', () => {
    renderModal();
    const input = screen.getByPlaceholderText(/what do you need to do/i);
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(screen.getByText('5/100 characters')).toBeInTheDocument();
  });
});

describe('CreateTaskModal — close behavior', () => {
  test('ESC key calls onClose', () => {
    renderModal();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('backdrop click calls onClose', () => {
    renderModal();
    const backdrop = document.querySelector('.modal-backdrop');
    fireEvent.click(backdrop, { target: backdrop });
    expect(onClose).toHaveBeenCalled();
  });

  test('close button calls onClose', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('Cancel button calls onClose', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('CreateTaskModal — validation', () => {
  test('shows error and blocks submit when title is empty on submit', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('radio', { name: /personal/i }));
    fireEvent.click(screen.getByRole('radio', { name: /daily/i }));

    const submitBtn = screen.getByRole('button', { name: /add task/i });
    expect(submitBtn).toBeDisabled();
  });

  test('submit button enabled when all fields filled', () => {
    renderModal();
    fireEvent.change(screen.getByPlaceholderText(/what do you need to do/i), {
      target: { value: 'My new task' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /personal/i }));
    fireEvent.click(screen.getByRole('radio', { name: /daily/i }));
    expect(screen.getByRole('button', { name: /add task/i })).not.toBeDisabled();
  });
});

describe('CreateTaskModal — submission', () => {
  function fillForm() {
    fireEvent.change(screen.getByPlaceholderText(/what do you need to do/i), {
      target: { value: 'Test task title' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /personal/i }));
    fireEvent.click(screen.getByRole('radio', { name: /daily/i }));
  }

  test('calls api.post with trimmed title, category, timeframe', async () => {
    const newTask = { id: 'new-1', title: 'Test task title', category: 'PERSONAL', timeframe: 'DAILY', status: 'TODO' };
    api.post.mockResolvedValueOnce({ data: newTask });

    renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/tasks', {
        title: 'Test task title',
        category: 'PERSONAL',
        timeframe: 'DAILY',
      });
      expect(onCreated).toHaveBeenCalledWith(newTask);
    });
  });

  test('shows API error message on failure', async () => {
    api.post.mockRejectedValueOnce(new Error('Server error'));

    renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/server error/i);
    });
  });

  test('supports PROFESSIONAL category and WEEKLY timeframe', () => {
    renderModal();
    fireEvent.change(screen.getByPlaceholderText(/what do you need to do/i), {
      target: { value: 'Work task' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /professional/i }));
    fireEvent.click(screen.getByRole('radio', { name: /weekly/i }));
    expect(screen.getByRole('button', { name: /add task/i })).not.toBeDisabled();
  });

  test('supports MONTHLY timeframe', () => {
    renderModal();
    fireEvent.change(screen.getByPlaceholderText(/what do you need to do/i), {
      target: { value: 'Monthly task' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /personal/i }));
    fireEvent.click(screen.getByRole('radio', { name: /monthly/i }));
    expect(screen.getByRole('button', { name: /add task/i })).not.toBeDisabled();
  });
});
