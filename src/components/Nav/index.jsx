import React, { useState } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import './styles.css';

    const Nav = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const location = useLocation();

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

      const closeMenu = () => {
        setIsMenuOpen(false);
      };

      return (
        <nav>
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/" onClick={closeMenu}>
                <img src="/assets/images/logo1.png" alt="Company Logo" className="nav-logo" />
              </Link>
              <button className="menu-toggle" onClick={toggleMenu} aria-expanded={isMenuOpen}>
                <span className="menu-icon"></span>
              </button>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>Rack Audit</Link></li>
              <li><Link to="/audits" onClick={closeMenu} className={location.pathname === '/audits' ? 'active' : ''}>Audit List</Link></li>
              <li><Link to="/templates" onClick={closeMenu} className={location.pathname === '/templates' ? 'active' : ''}>Reports</Link></li>
              <li><Link to="/settings" onClick={closeMenu} className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link></li>
              <li><Link to="/customers" onClick={closeMenu} className={location.pathname === '/customers' ? 'active' : ''}>Customers</Link></li>
              <li><Link to="/scheduled-audits" onClick={closeMenu} className={location.pathname === '/scheduled-audits' ? 'active' : ''}>Scheduled Audits</Link></li>
              <li><Link to="/dashboard" onClick={closeMenu} className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
            </ul>
          </div>
        </nav>
      );
    };

    export default Nav;
