import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import '../App.css';
import './NavBar.css'; // Import the CSS file

function NavBar() {
  const location = useLocation();
  const [ setActiveLink] = useState('');

  const handleNavLinkClick = (label) => {
    if (label !== 'Upload File') {
      localStorage.removeItem('filename');
    }
    setActiveLink(label);
  };

  const isDarkMode = true; 
  const isRTL = false; 

  // Define dynamic classes based on conditions
  const navbarClasses = `navbar ${isDarkMode ? 'dark' : ''}`;
  const ulClasses = `font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg ${
    isDarkMode ? 'dark' : ''
  } ${
    isRTL ? 'rtl:space-x-reverse' : 'md:flex-row md:space-x-8'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex flex-col">
            <p className="self-center text-2xl font-semibold whitespace-nowrap text-white tracking-wider">Chanakya</p>
            <p className="text-[0.625rem] text-white text-right">by <b>OSI Digital</b></p>
          </div>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className={ulClasses}>
            <li className={`p-2 ${location.pathname === '/' ? 'active-link' : 'text-white'}`}>
              <NavLink
                to="/"
                activeclassname="active"
                onClick={() => handleNavLinkClick('Interact with Chanakya')}
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <span>Interact with Chanakya</span>
              </NavLink>
            </li>
            <li className={`p-2 ${location.pathname === '/query/database' ? 'active-link' : 'text-white'}`}>
              <NavLink
                to="/query/database"
                activeclassname="active"
                onClick={() => handleNavLinkClick('Query Database')}
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Query Database
              </NavLink>
            </li>
            <li className={`p-2 ${location.pathname === '/query/pdf' ? 'active-link' : 'text-white'}`}>
              <NavLink
                to="/query/pdf"
                activeclassname="active"
                onClick={() => handleNavLinkClick('Upload File')}
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Upload File
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
