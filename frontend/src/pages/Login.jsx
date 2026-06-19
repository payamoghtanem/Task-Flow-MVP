import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <h1>Log In</h1>
      <p>Login form — implemented in S1-T09</p>
    </main>
  );
}
