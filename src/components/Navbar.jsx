import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="brand">JWT Auth</div>
      <div className="nav-links">
        {user ? (
          <>
            {user.role === 'Admin' && <Link to="/admin">Admin</Link>}
            {(user.role === 'Admin' || user.role === 'Manager') && <Link to="/manager">Manager</Link>}
            <Link to="/user">User</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
