import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">© 2025 Artgallery. All rights reserved.</p>
        <div className="social-icons">
          {/* Instagram Icon */}
          <a href="#" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>

          {/* YouTube Icon */}
          <a href="#" className="social-icon">
            <i className="fab fa-youtube"></i>
          </a>

          {/* Twitter Icon */}
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
