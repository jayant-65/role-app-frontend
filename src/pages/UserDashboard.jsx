import { useEffect, useState } from 'react';
import api from '../services/api.js';
import withAuth from '../components/withAuth.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard/user')
      .then((res) => setProfile(res.data.user))
      .catch(() => setError('Could not load your profile.'));
  }, []);

  return (
    <main>
      <div className="dashboard-grid">
        <div className="hero-banner">
          <h1>User Dashboard</h1>
          <p>Welcome, {user?.fullName}. Review your profile and assigned tasks in one place.</p>
        </div>

        <div className="dashboard-top">
          <div className="stats-card">
            <h3>My Role</h3>
            <p>{profile?.role ?? '—'}</p>
          </div>
          <div className="stats-card">
            <h3>My Tasks</h3>
            <p>5</p>
          </div>
          <div className="stats-card">
            <h3>Notifications</h3>
            <p>3</p>
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="info-card">
          <h3>Your Information</h3>
          <p>Name: {profile?.fullName ?? user?.fullName}</p>
          <p>Email: {profile?.email ?? user?.email}</p>
          <p>Role: {profile?.role ?? user?.role}</p>
        </div>
      </div>
    </main>
  );
};

export default withAuth(UserDashboard);
