import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockNavigate = vi.hoisted(() => vi.fn());
const mockLogin = vi.hoisted(() => vi.fn());
const mockApiPost = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, isAuthenticated: false, login: mockLogin, logout: vi.fn() }),
}));

vi.mock('../services/api', () => ({
  api: { post: mockApiPost },
}));

import Login from './Login';

beforeEach(() => vi.clearAllMocks());

function renderLogin(locationState = {}) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/login', state: locationState }]}>
      <Login />
    </MemoryRouter>
  );
}

describe('Login — rendering', () => {
  test('renders email, password fields and login button', () => {
    renderLogin();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('shows link to register page', () => {
    renderLogin();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });
});

describe('Login — session expired banner', () => {
  test('shows session expired banner when location.state.expired === true', () => {
    renderLogin({ expired: true });
    expect(screen.getByRole('status')).toHaveTextContent(/session has expired/i);
  });

  test('does not show session expired banner without expired state', () => {
    renderLogin();
    expect(screen.queryByRole('status')).toBeNull();
  });

  test('does not show banner when expired is not exactly true', () => {
    renderLogin({ expired: 'true' });
    expect(screen.queryByRole('status')).toBeNull();
  });
});

describe('Login — validation on blur', () => {
  test('shows email error when email field blurred empty', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.blur(emailInput, { target: { name: 'email', value: '' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
  });

  test('shows invalid email error on blur', () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'bad', name: 'email' } });
    fireEvent.blur(emailInput, { target: { name: 'email', value: 'bad' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
  });
});

describe('Login — submit validation', () => {
  test('does not call api when email is invalid', () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    expect(mockApiPost).not.toHaveBeenCalled();
  });

  test('shows password required error when email valid but password empty', async () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'user@example.com', name: 'email' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/password is required/i);
      expect(mockApiPost).not.toHaveBeenCalled();
    });
  });
});

describe('Login — API interactions', () => {
  function fillAndSubmit(email = 'user@example.com', password = 'password123') {
    const emailInput = screen.getByLabelText(/email address/i);
    const pwInput = document.querySelector('input[type="password"]');
    fireEvent.change(emailInput, { target: { value: email, name: 'email' } });
    fireEvent.change(pwInput, { target: { value: password, name: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
  }

  test('shows error message on INVALID_CREDENTIALS', async () => {
    mockApiPost.mockRejectedValueOnce(new Error('Invalid email or password'));

    renderLogin();
    fillAndSubmit();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i);
    });
  });

  test('calls login and navigates to dashboard on success', async () => {
    const userData = { id: 'u1', email: 'user@example.com' };
    mockApiPost.mockResolvedValueOnce({ data: { user: userData, token: 'tok' } });

    renderLogin();
    fillAndSubmit();

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(userData, 'tok');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  test('redirects to original location.state.from.pathname after login', async () => {
    const userData = { id: 'u1', email: 'user@example.com' };
    mockApiPost.mockResolvedValueOnce({ data: { user: userData, token: 'tok' } });

    renderLogin({ from: { pathname: '/tasks/123' } });
    fillAndSubmit();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tasks/123', { replace: true });
    });
  });

  test('sends lowercased email to API', async () => {
    mockApiPost.mockResolvedValueOnce({ data: { user: { id: 'u1', email: 'user@example.com' }, token: 'tok' } });

    renderLogin();
    fillAndSubmit('USER@EXAMPLE.COM', 'password123');

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith('/auth/login', {
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
});
