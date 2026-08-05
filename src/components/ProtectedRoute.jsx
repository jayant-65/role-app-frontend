import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-card"><p>Loading...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="page-card"><p className="alert">Access denied. Your role does not permit this page.</p></div>;
  }

  return children;
};

export default ProtectedRoute;
