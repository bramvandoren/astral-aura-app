// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

function Header() {
  // const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mediums">Mediums</Link>
          </li>
          {/* {user ? ( */}
            <>
              <li>
                <Link to="/profiel">Profiel</Link>
              </li>
              {/* <li>
                <button onClick={logout}>Logout</button>
              </li> */}
            </>
          {/* ) : ( */}
            <>
              
            </>
          {/* )} */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
