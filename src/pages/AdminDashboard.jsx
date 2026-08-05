import { useEffect, useState } from 'react';
import api from '../services/api.js';
import withAuth from '../components/withAuth.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard/admin')
      .then((res) => setStats(res.data))
      .catch(() => setError('Could not load admin statistics.'));
  }, []);

  return (
    <main>
      <div className="dashboard-grid">
        <div className="hero-banner">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.fullName}. Control users, roles, and system health from here.</p>
        </div>

        <div className="dashboard-top">
          <div className="stats-card">
            <h3>Total Users</h3>
            <p>{stats?.totalUsers ?? '—'}</p>
          </div>
          {stats?.totals?.map((item) => (
            <div key={item.role} className="stats-card">
              <h3>{item.role}</h3>
              <p>{item.count}</p>
            </div>
          ))}
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="section-card">
          <h3>Admin Actions</h3>
          <p>Manage users, review system status, and ensure role protections are enforced correctly.</p>
        </div>

        <div className="info-card">
          <h3>Admin Information</h3>
          <p>Name: {user?.fullName}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
    </main>
  );
};

export default withAuth(AdminDashboard);
