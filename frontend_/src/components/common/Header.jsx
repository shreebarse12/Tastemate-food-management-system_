import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';
import logo from '../../assets/logoTM.png';
import { FaUserCircle } from 'react-icons/fa';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="TM Smart Food Logo" style={{ height: '48px', width: 'auto' }} />
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/about" className="nav-link">How It Works</Link>
        </div>

        <div className="auth-buttons">
          {user ? (
            <>
              <div className="user-menu">
                <button className="profile-btn" onClick={toggleMenu}>
                  {user && user.name ? user.name.charAt(0) : <span className="profile-placeholder">U</span>}
                </button>
                {isMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/orders" className="dropdown-item">My Orders</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link">Home</Link>
            <Link to="/explore" className="mobile-link">Explore</Link>
            <Link to="/about" className="mobile-link">How It Works</Link>
            {user ? (
              <>
                <Link to="/profile" className="mobile-link">Profile</Link>
                <Link to="/orders" className="mobile-link">My Orders</Link>
                <button onClick={handleLogout} className="mobile-link logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-link">Login</Link>
                <Link to="/signup" className="mobile-link">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;