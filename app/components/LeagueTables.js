import React from 'react';

import TableContainer from './Tables/TableContainer';

require('../../stylesheets/components/LeagueTables.scss');

const LeagueTables = () => (
  <div className='app-content'>
    <TableContainer max={31} />
  </div>
);

export default LeagueTables;
