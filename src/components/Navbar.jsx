import React, { useState } from 'react';
import "../styles/navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    }
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="logo">Tate Sever - Data Visualization</Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li 
          className="dropdown" 
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="/current-works">Current Works</Link>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/d3-vis">D3 Visualization</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/other-projects">Other Projects</Link></li>
        <li><Link to="/personal">Personal</Link></li>
        <li><a href="https://www.linkedin.com/in/gabriel-sever-dvis/">LinkedIN</a></li>
        <li><a href="mailto:gabrieltsever@gmail.com">Contact</a></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;