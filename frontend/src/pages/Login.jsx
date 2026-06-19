import { useState, useRef } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AuthCard from '../components/AuthCard';
import FormField from '../components/FormField';
import PasswordInput from '../components/PasswordInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || !email.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address';
  return null;
}

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const sessionExpired = location.state?.expired === true;
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  function handleBlur(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const emailErr = validateEmail(email);
    setErrors({ email: emailErr });

    if (emailErr) {
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });
      login(data.user, data.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      emailRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="auth-logo" aria-hidden="true">TaskFlow</div>
      <h1 className="auth-heading">Welcome back</h1>

      {sessionExpired && (
        <div role="status" className="session-expired-banner">
          Your session has expired. Please log in again.
        </div>
      )}

      {apiError && (
        <div role="alert" className="api-error">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Email address" error={errors.email} id="login-email">
          <input
            ref={emailRef}
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            className={`form-input${errors.email ? ' form-input--error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            placeholder="email@example.com"
          />
        </FormField>

        <FormField label="Password" error={errors.password} id="login-password">
          <PasswordInput
            ref={passwordRef}
            id="login-password"
            name="password"
            autoComplete="current-password"
            className={errors.password ? 'form-input--error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        <button
          type="submit"
          className="btn btn--primary btn--full"
          disabled={isLoading}
          aria-busy={isLoading ? 'true' : undefined}
        >
          {isLoading ? 'Logging in…' : 'Log In'}
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account?{' '}
        <Link to="/register">Sign up for free</Link>
      </p>
    </AuthCard>
  );
}
