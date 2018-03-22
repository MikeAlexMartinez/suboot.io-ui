import React from 'react';
import { Link } from 'react-router-dom';
require('../../stylesheets/components/NavBar.scss');

const NavBar = () => (
  <div className='nav-bar'>
    <Link to='/general'>
      General
    </Link>
    <Link to='/explore'>
      Explore
    </Link>
    <Link to='/leaguetables'>
      League Table
    </Link>
  </div>
);

export default NavBar;
