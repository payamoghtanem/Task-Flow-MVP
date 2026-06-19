import { useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AuthCard from '../components/AuthCard';
import FormField from '../components/FormField';
import PasswordInput from '../components/PasswordInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || !email.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address';
  if (email.length > 255) return 'Email must not exceed 255 characters';
  return null;
}

function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export default function Register() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  function handleBlur(e) {
    const { name, value } = e.target;
    const err = name === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr) {
      emailRef.current?.focus();
      return;
    }
    if (passwordErr) {
      passwordRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        email: email.trim().toLowerCase(),
        password,
      });
      login(data.user, data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err.code === 'EMAIL_TAKEN') {
        setApiError({ type: 'email_taken', message: err.message });
      } else {
        setApiError({ type: 'generic', message: err.message || 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard>
      <div className="auth-logo" aria-hidden="true">TaskFlow</div>
      <h1 className="auth-heading">Create your account</h1>

      {apiError && (
        <div role="alert" className="api-error">
          {apiError.type === 'email_taken' ? (
            <>An account with this email already exists. <Link to="/login">Log in instead.</Link></>
          ) : (
            apiError.message
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Email address" error={errors.email} id="email">
          <input
            ref={emailRef}
            id="email"
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

        <FormField label="Password" hint="Min. 8 characters" error={errors.password} id="password">
          <PasswordInput
            ref={passwordRef}
            id="password"
            name="password"
            autoComplete="new-password"
            className={errors.password ? 'form-input--error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur}
          />
        </FormField>

        <button
          type="submit"
          className="btn btn--primary btn--full"
          disabled={isLoading}
          aria-busy={isLoading ? 'true' : undefined}
        >
          {isLoading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link to="/login">Log in</Link>
      </p>
    </AuthCard>
  );
}
