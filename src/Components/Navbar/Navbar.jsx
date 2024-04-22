import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  // Get the current location using the useLocation hook from react-router-dom
  const location = useLocation();

  // Load Menu State from localStorage when the Component Starts:
  // If there's nothing stored in localStorage for the 'menu' key, default to 'shop'.
  const initialMenu = localStorage.getItem('menu') || 'shop';

  // Set the initial state of the menu using the value stored in localStorage
  const [menu, setMenu] = useState(initialMenu);

  // Function for navbar hide button (media query)
  const menuRef = useRef();

  // State to manage the animation
  const [isAnimationActive, setIsAnimationActive] = useState(true);

  const dropdown_toggle = (e) => {
    // Toggle the visibility of the dropdown menu
    menuRef.current.classList.toggle('nav-menu-visible');

    // Toggle the 'open' class on the dropdown button for appearance change
    e.target.classList.toggle('open');

    // Toggle the animation state
    setIsAnimationActive(!isAnimationActive);
  }

  // Clear menu state in localStorage when the component mounts
  useEffect(() => {
    localStorage.removeItem('menu');
  }, []);

  // Reset menu state to the default value when the component mounts or initialMenu changes
  useEffect(() => {
    setMenu(initialMenu);
  }, [initialMenu]);

  // Update localStorage Whenever the Menu State Changes:
  // Watch for changes in the 'menu' state and update localStorage accordingly
  useEffect(() => {
    localStorage.setItem('menu', menu);
  }, [menu]);

  // Check if the current location is different from the stored menu
  useEffect(() => {
    // Extract the path without the leading slash
    const pathWithoutSlash = location.pathname.replace('/', '');
    // Update the menu state if the pathWithoutSlash is different from the stored menu
    if (pathWithoutSlash !== menu) {
      setMenu(pathWithoutSlash);
    }
  }, [location.pathname, menu]);


  return (
    <div className='navbar'>
      <div className='nav-logo'>
        {/* Logo and brand name */}
        <Link to='/'><img src='https://cdn-icons-png.flaticon.com/128/4484/4484758.png' alt='logo-img' className='logo-img' /></Link>
        <Link to='https://www.schbang-q.com/' style={{ textDecoration: 'none' }}><p className='shopper-paragraph'>SchbangQ</p></Link>
      </div>
      <h4> Menu </h4>
      <img
        className={`nav-dropdown ${isAnimationActive ? 'pulse-animation' : ''}`}
        onClick={dropdown_toggle}
        src="https://cdn-icons-png.flaticon.com/128/9347/9347217.png"
        alt=""
      />
      <ul ref={menuRef} className='nav-menu'>
        {/* Shop section */}
        <li>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
          {menu === 'shop' || location.pathname === '/' ? <div className='hr-element'></div> : null}
        </li>
        {/* Recommended Section*/}
        <li>
          <Link to='/men' style={{ textDecoration: 'none' }}>Books Filtering</Link>
          {menu === 'men' ? <div className='hr-element'></div> : null}
        </li>
      </ul>
    </div>
  );
};
