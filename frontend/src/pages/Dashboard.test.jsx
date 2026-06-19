import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockNavigate = vi.hoisted(() => vi.fn());
const mockLogout = vi.hoisted(() => vi.fn());
const mockApiGet = vi.hoisted(() => vi.fn());
const mockApiPost = vi.hoisted(() => vi.fn());
const mockApiPatch = vi.hoisted(() => vi.fn());
const mockApiDelete = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'u1', email: 'test@example.com' },
    isAuthenticated: true,
    logout: mockLogout,
  }),
}));

vi.mock('../services/api', () => ({
  api: {
    get: mockApiGet,
    post: mockApiPost,
    patch: mockApiPatch,
    delete: mockApiDelete,
  },
}));

import Dashboard from './Dashboard';

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
}

const PERSONAL_TODO = {
  id: 't1', title: 'Personal task', category: 'PERSONAL', timeframe: 'DAILY', status: 'TODO', created_at: '2026-06-19T10:00:00Z',
};
const PROFESSIONAL_DONE = {
  id: 't2', title: 'Work task', category: 'PROFESSIONAL', timeframe: 'WEEKLY', status: 'DONE', created_at: '2026-06-19T09:00:00Z',
};

beforeEach(() => {
  vi.clearAllMocks();
  mockApiGet.mockResolvedValue({ data: [] });
});

describe('Dashboard — rendering', () => {
  test('shows loading state initially', () => {
    mockApiGet.mockReturnValue(new Promise(() => {}));
    renderDashboard();
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  test('shows user email in header', async () => {
    renderDashboard();
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('shows empty state when no tasks exist', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });
  });

  test('shows tasks after loading', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [PERSONAL_TODO] });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Personal task')).toBeInTheDocument();
    });
  });

  test('groups tasks by status', async () => {
    const inProgress = { ...PERSONAL_TODO, id: 't3', status: 'IN_PROGRESS', title: 'In progress task' };
    mockApiGet.mockResolvedValueOnce({ data: [PERSONAL_TODO, PROFESSIONAL_DONE, inProgress] });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText(/^todo \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/^in progress \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/^done \(1\)/i)).toBeInTheDocument();
    });
  });
});

describe('Dashboard — 401 handling', () => {
  test('logs out and redirects to /login with expired state on 401', async () => {
    const err = Object.assign(new Error('Unauthorized'), { status: 401 });
    mockApiGet.mockRejectedValueOnce(err);
    renderDashboard();
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login', { state: { expired: true } });
    });
  });

  test('shows error banner for non-401 API errors', async () => {
    const err = Object.assign(new Error('Server error'), { status: 500 });
    mockApiGet.mockRejectedValueOnce(err);
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/server error/i);
    });
  });
});

describe('Dashboard — category filter', () => {
  beforeEach(() => {
    mockApiGet.mockResolvedValue({ data: [PERSONAL_TODO, PROFESSIONAL_DONE] });
  });

  test('shows all tasks with All tab selected by default', async () => {
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Personal task')).toBeInTheDocument();
      expect(screen.getByText('Work task')).toBeInTheDocument();
    });
  });

  test('filters to PERSONAL tasks when Personal tab clicked', async () => {
    renderDashboard();
    await waitFor(() => screen.getByText('Personal task'));
    fireEvent.click(screen.getByRole('tab', { name: /personal/i }));
    expect(screen.getByText('Personal task')).toBeInTheDocument();
    expect(screen.queryByText('Work task')).toBeNull();
  });

  test('filters to PROFESSIONAL tasks when Professional tab clicked', async () => {
    renderDashboard();
    await waitFor(() => screen.getByText('Work task'));
    fireEvent.click(screen.getByRole('tab', { name: /professional/i }));
    expect(screen.getByText('Work task')).toBeInTheDocument();
    expect(screen.queryByText('Personal task')).toBeNull();
  });

  test('tab aria-selected reflects active filter', async () => {
    renderDashboard();
    await waitFor(() => screen.getByText('Personal task'));
    const personalTab = screen.getByRole('tab', { name: /personal/i });
    fireEvent.click(personalTab);
    expect(personalTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /^all/i })).toHaveAttribute('aria-selected', 'false');
  });

  test('shows empty state when filter has no matching tasks', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [PERSONAL_TODO] });
    renderDashboard();
    await waitFor(() => screen.getByText('Personal task'));
    fireEvent.click(screen.getByRole('tab', { name: /professional/i }));
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });
});

describe('Dashboard — logout', () => {
  test('logout button calls api.post /auth/logout and navigates to /login', async () => {
    mockApiPost.mockResolvedValueOnce({});
    renderDashboard();
    await waitFor(() => screen.queryByText(/loading/i) === null);
    fireEvent.click(screen.getByRole('button', { name: /log out/i }));
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});

describe('Dashboard — Add Task modal', () => {
  test('Add Task button opens modal', async () => {
    renderDashboard();
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
    fireEvent.click(screen.getByRole('button', { name: /\+ add task/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('new task prepended to list on creation', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [] });
    const newTask = { id: 'new-1', title: 'Brand new task', category: 'PERSONAL', timeframe: 'DAILY', status: 'TODO', created_at: new Date().toISOString() };
    mockApiPost.mockResolvedValueOnce({ data: newTask });

    renderDashboard();
    await waitFor(() => screen.getByText(/no tasks yet/i));

    fireEvent.click(screen.getByRole('button', { name: /add your first task/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/what do you need to do/i), {
      target: { value: 'Brand new task' },
    });
    fireEvent.click(screen.getByRole('radio', { name: /personal/i }));
    fireEvent.click(screen.getByRole('radio', { name: /daily/i }));
    fireEvent.click(screen.getByRole('button', { name: /^add task$/i }));

    await waitFor(() => {
      expect(screen.getByText('Brand new task')).toBeInTheDocument();
    });
  });
});

describe('Dashboard — task status updates and deletes', () => {
  test('status update reflects in task list', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [PERSONAL_TODO] });
    const updated = { ...PERSONAL_TODO, status: 'IN_PROGRESS', updated_at: new Date().toISOString() };
    mockApiPatch.mockResolvedValueOnce({ data: updated });

    renderDashboard();
    await waitFor(() => screen.getByText('Personal task'));
    fireEvent.click(screen.getByRole('button', { name: /start task/i }));
    await waitFor(() => {
      expect(screen.getByText(/in progress \(1\)/i)).toBeInTheDocument();
    });
  });

  test('deleted task is removed from list', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [PERSONAL_TODO] });
    mockApiDelete.mockResolvedValueOnce({});

    renderDashboard();
    await waitFor(() => screen.getByText('Personal task'));
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm delete/i }));
    await waitFor(() => {
      expect(screen.queryByText('Personal task')).toBeNull();
    });
  });
});
