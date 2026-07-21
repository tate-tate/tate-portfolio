import { useEffect, useState } from 'react';
import "../styles/navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!document.body.classList.contains('dark-mode') && !document.body.classList.contains('light-mode')) {
      document.body.classList.add('dark-mode');
    }
  }, []);

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

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="logo">Tate Sever - Data Visualization</Link>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
          ☰
        </button>
      </div>
      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/current-works">Working On</Link></li>
        <li><Link to="/d3-vis">D3.js</Link></li>
        <li><Link to="/tableau">Tableau</Link></li>
        {/* <li><Link to="/photography">Gallery</Link></li> */}
        <li><a href="https://www.linkedin.com/in/gabriel-sever-dvis/">LinkedIN</a></li>
        <li><a href="https://github.com/tate-tate">GitHub</a></li>
        <li><a href="mailto:gabrieltsever@gmail.com">Contact</a></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme} type="button">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;