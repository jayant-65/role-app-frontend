import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="page-card">
        <h1 className="page-title">JWT Authentication System</h1>
        <p className="hero-text">Role-Based Access Control with MERN Stack</p>
        <div className="feature-list">
          <div className="feature-item">
            ✓ Secure JWT token-based authentication
          </div>
          <div className="feature-item">
            ✓ Three role levels: User, Manager, and Admin
          </div>
          <div className="feature-item">
            ✓ Protected routes with role-based authorization
          </div>
          <div className="feature-item">
            ✓ Responsive UI and token persistence
          </div>
        </div>
        <div className="home-actions">
          <Link to="/login" className="home-button">
            Login
          </Link>
          <Link to="/register" className="home-button home-button-secondary">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
