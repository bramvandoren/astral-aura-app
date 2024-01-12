// Header.js
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';


function Header() {
  // const { user, logout } = useAuth();
  const storedMenuItem = sessionStorage.getItem('selectedMenuItem');
  const [selectedMenuItem, setSelectedMenuItem] = useState(storedMenuItem || '/');

  useEffect(() => {
    sessionStorage.setItem('selectedMenuItem', selectedMenuItem);
  }, [selectedMenuItem]);

  

  return (
    <header>
      <nav>
        <ul>
        <li className={`navItem ${selectedMenuItem === '/' ? 'active' : ''}`}>
            <Link to="/" onClick={() => setSelectedMenuItem('/')} >
              {/* <img src={"/home.svg"} alt="Home" /> */}
              <svg fill="#FFFFFF" width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path  d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L1.42108547e-14,384 L1.42108547e-14,153.6 L192,1.42108547e-14 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z" transform="translate(64 64)"></path></g></svg>
              Home
            </Link>
          </li>
          <li className={`navItem ${selectedMenuItem === '/opdrachten' ? 'active' : ''}`}>
           <Link to="/opdrachten" onClick={() => setSelectedMenuItem('/opdrachten')}>
            {/* <img src={"/opdrachten.svg"} alt="Opdrachten" /> */}
              <svg width="25px" height="25px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>assignment-text</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <g> <path d="M16,16a2,2,0,0,0,0,4H32a2,2,0,0,0,0-4Z"></path> <path d="M32,24H16a2,2,0,0,0,0,4H32a2,2,0,0,0,0-4Z"></path> <path d="M24,32H16a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"></path> <path d="M40,6H36V4a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2V6H8A2,2,0,0,0,6,8V44a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V8A2,2,0,0,0,40,6ZM38,42H10V10h6V6H32v4h6Z"></path> </g> </g> </g> </g></svg>
              Opdrachten
            </Link>
          </li>
          <li className={`navItem ${selectedMenuItem === '/mediums' ? 'active' : ''}`}>
          <Link to="/mediums" onClick={() => setSelectedMenuItem('/mediums')}>
            {/* <img src={"/mediums.svg"} alt="Mediums" /> */}
              <svg fill="#FFFFFF" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,6H16V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V6H5A3,3,0,0,0,2,9v9a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM10,5h4V6H10ZM20,18a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13H8v1a1,1,0,0,0,2,0V13h4v1a1,1,0,0,0,2,0V13h4Zm0-7H4V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z"></path></g></svg>
              Mediums
            </Link>
          </li>
          <li className={`navItem ${selectedMenuItem === '/profiel' ? 'active' : ''}`}>
          <Link to="/profiel" onClick={() => setSelectedMenuItem('/profiel')}>
            {/* <img src={"/profiel.svg"} alt="Profiel" /> */}
            <svg fill="#FFFFFF" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM4,23H20a1,1,0,0,0,1-1V18a5.006,5.006,0,0,0-5-5H8a5.006,5.006,0,0,0-5,5v4A1,1,0,0,0,4,23Zm1-5a3,3,0,0,1,3-3h8a3,3,0,0,1,3,3v3H5Z"></path></g></svg>
            Profiel
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
