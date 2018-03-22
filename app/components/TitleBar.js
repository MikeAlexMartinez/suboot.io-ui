import React from 'react';
import { Link } from 'react-router-dom';
require('../../stylesheets/components/TitleBar.scss');

const TitleBar = () => (
  <div className='title-bar'>
    <h1 className='title'>
      <Link to="/">Suboot.io</Link>
    </h1>
  </div>
);

export default TitleBar;
