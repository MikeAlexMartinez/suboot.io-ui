import React from 'react';
import { Link } from 'react-router-dom';
require('../../stylesheets/components/NavBar.scss');

const isActive = (str) => 
  window.location.pathname === str
    ? 'navlink active'
    : 'navlink';

const NavBar = () => (
  <div className='nav-bar'>
    <Link 
      className={isActive('/general')}
      to='/general'
    >
      General
    </Link>
    <Link
      className={isActive('/explore')} 
      to='/explore'
    >
      Explore
    </Link>
    <Link 
      className={isActive('/leaguetables')} 
      to='/leaguetables'
    >
      League Tables
    </Link>
  </div>
);

export default NavBar;
