import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    const isLight = storedMode === 'light';
    setIsDarkMode(!isLight); // dark = true if not light
    document.body.classList.toggle('lightcolors', isLight);
  }, []);

  const handleToggle = (e) => {
    const isChecked = e.target.checked;
    setIsDarkMode(!isChecked); // dark mode is ON when checkbox is OFF
    localStorage.setItem('mode', isChecked ? 'light' : 'dark');
    document.body.classList.toggle('lightcolors', isChecked);
  };

  return (
    <div className="navbar">
      <h1 className="logo-title">My Food</h1>

      <div className="navbar-actions">
        <label id="visual-toggle-button">
          <input
            type="checkbox"
            className="visual-toggle"
            id="visual-toggle"
            checked={!isDarkMode}
            onChange={handleToggle}
          />
          <span className="switch-text">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
        </label>

        <img className="profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
