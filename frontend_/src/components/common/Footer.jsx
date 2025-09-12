import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <h2>TasteMate</h2>
          </Link>
          <p className="footer-desc">
            Elevate your dining experience with TasteMate. We connect students with the best mess options around campus.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/explore" className="footer-link">Explore</Link></li>
            <li><Link to="/about" className="footer-link">How It Works</Link></li>
            <li><Link to="/faqs" className="footer-link">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="contact-info">
            <p>123 University Avenue, PO 456789</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Email: info@tastemate.com</p>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TasteMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;