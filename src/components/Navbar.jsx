import React, { useState } from 'react';
import "../styles/navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle("dark-bg");
    document.querySelector(".navbar").classList.toggle("dark-bg");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/"><p className="logo">Tate Sever - Data Visualization</p></Link></li>
        <li><Link to="/current-works">Current Works</Link></li>
        <li><Link to="/other-projects">Other Projects</Link></li>
        <li><Link to="/personal">Personal</Link></li>
        <li><a href="mailto:gabrieltsever@gmail.com">Contact Me</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
