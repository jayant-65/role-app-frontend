import { useEffect, useState } from 'react';
import api from '../services/api.js';
import withAuth from '../components/withAuth.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ManagerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard/manager')
      .then((res) => setSummary(res.data))
      .catch(() => setError('Could not load manager summary.'));
  }, []);

  return (
    <main>
      <div className="dashboard-grid">
        <div className="hero-banner">
          <h1>Manager Dashboard</h1>
          <p>Welcome, {user?.fullName}. Monitor your projects, team tasks, and pending approvals.</p>
        </div>

        <div className="dashboard-top">
          <div className="stats-card">
            <h3>Team Members</h3>
            <p>{summary?.teamSize ?? '—'}</p>
          </div>
          <div className="stats-card">
            <h3>Active Projects</h3>
            <p>{summary?.activeProjects ?? '—'}</p>
          </div>
          <div className="stats-card">
            <h3>Pending Approvals</h3>
            <p>{summary?.pendingApprovals ?? '—'}</p>
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="section-card">
          <h3>Recent Activities</h3>
          <p>Track project progress and approval status for your team.</p>
        </div>

        <div className="info-card">
          <h3>Manager Information</h3>
          <p>Name: {user?.fullName}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ManagerDashboard);
