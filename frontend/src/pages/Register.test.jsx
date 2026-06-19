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

import Register from './Register';

function renderRegister() {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
}

beforeEach(() => vi.clearAllMocks());

describe('Register — rendering', () => {
  test('renders email, password fields and submit button', () => {
    renderRegister();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('shows link to login page', () => {
    renderRegister();
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  });
});

describe('Register — validation on blur', () => {
  test('shows email error when field blurred with empty value', () => {
    renderRegister();
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.blur(emailInput, { target: { name: 'email', value: '' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
  });

  test('shows invalid email error on blur', () => {
    renderRegister();
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'notvalid', name: 'email' } });
    fireEvent.blur(emailInput, { target: { name: 'email', value: 'notvalid' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
  });

  test('shows password too short error on blur', () => {
    renderRegister();
    const pwWrapper = document.querySelector('input[type="password"]');
    fireEvent.blur(pwWrapper, { target: { name: 'password', value: 'short' } });
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 8 characters/i);
  });
});

describe('Register — submit validation', () => {
  test('does not call api when email is invalid', async () => {
    renderRegister();
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(mockApiPost).not.toHaveBeenCalled();
  });

  test('shows email error on submit with empty form', async () => {
    renderRegister();
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert');
      expect(alerts.some((a) => /email is required/i.test(a.textContent))).toBe(true);
    });
  });
});

describe('Register — API interactions', () => {
  function fillAndSubmit(email = 'user@example.com', password = 'password123') {
    const emailInput = screen.getByLabelText(/email address/i);
    const pwInput = document.querySelector('input[type="password"]');
    fireEvent.change(emailInput, { target: { value: email, name: 'email' } });
    fireEvent.change(pwInput, { target: { value: password, name: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
  }

  test('shows EMAIL_TAKEN error and link to login', async () => {
    const err = Object.assign(new Error('Account already exists'), { code: 'EMAIL_TAKEN' });
    mockApiPost.mockRejectedValueOnce(err);

    renderRegister();
    fillAndSubmit();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /log in instead/i })).toBeInTheDocument();
    });
  });

  test('shows generic error for other API failures', async () => {
    mockApiPost.mockRejectedValueOnce(new Error('Server error'));

    renderRegister();
    fillAndSubmit();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/server error/i);
    });
  });

  test('calls login and navigates to dashboard on success', async () => {
    const userData = { id: 'u1', email: 'user@example.com' };
    mockApiPost.mockResolvedValueOnce({ data: { user: userData, token: 'tok' } });

    renderRegister();
    fillAndSubmit();

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(userData, 'tok');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  test('sends lowercased email to API', async () => {
    mockApiPost.mockResolvedValueOnce({ data: { user: { id: 'u1', email: 'user@example.com' }, token: 'tok' } });

    renderRegister();
    fillAndSubmit('USER@EXAMPLE.COM', 'password123');

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith('/auth/register', {
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
});
