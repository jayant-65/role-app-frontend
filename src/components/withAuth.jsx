import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div className="page-card"><p>Loading...</p></div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
