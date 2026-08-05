import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <div className="page-card">
        <h1 className="page-title">Page not found</h1>
        <p className="text-small">
          The page you are looking for does not exist. Go back to <Link to="/login">Login</Link>.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
