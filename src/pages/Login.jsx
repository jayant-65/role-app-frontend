import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!identifier || !password) {
      setError('Please enter email or username and password.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const user = await login({ identifier, password });
      if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Manager') {
        navigate('/manager');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="page-card">
        <h1 className="page-title">Login</h1>
        {error && <div className="alert">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email or Username
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="text-small">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
