import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fullName || !email || !password || !confirmPassword || !role) {
      setError('Please complete all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await register({ fullName, email, password, role });
      if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Manager') {
        navigate('/manager');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="page-card">
        <h1 className="page-title">Register</h1>
        {error && <div className="alert">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" />
          </label>
          <label>
            Email Address
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </label>
          <label>
            Confirm Password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
          <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <p className="text-small">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
