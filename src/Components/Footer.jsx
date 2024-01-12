// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

function Footer() {
  // const { user, logout } = useAuth();

  return (
    <footer className='footer'>
      <div className="footer-content">
        <p>&copy; 2024 AstralAura - Bram Van Doren</p>
      </div>
    </footer>
  );
}

export default Footer;
