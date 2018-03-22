import React from 'react';
import { Link } from 'react-router-dom';
require('../../stylesheets/components/NavBar.scss');

const isActive = (str) => window.location.pathname === str;

const NavBar = () => (
  <div className='nav-bar'>
    <Link 
      className={
        isActive('/general')
          ? 'navlink active'
          : 'navlink'
      } 
      to='/general'
    >
      General
    </Link>
    <Link
      className={
        isActive('/explore')
          ? 'navlink active'
          : 'navlink'
      } 
      to='/explore'
    >
      Explore
    </Link>
    <Link 
      className={
        isActive('/leaguetables')
          ? 'navlink active'
          : 'navlink'
      } 
      to='/leaguetables'
    >
      League Tables
    </Link>
  </div>
);

export default NavBar;
