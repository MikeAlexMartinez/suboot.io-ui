'use strict';

import React from 'react';

import TableExample from './TableExample';
import GameweekRange from './TableSettings';

const data = [
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },{
    name: 'Jason Maurer',
    age: 23,
    friend: {
      name: 'Tanner Linsley',
      age: 26,
    }
  }, {
    name: 'Me',
    age: 30,
    friend: {
      name: 'Bunny',
      age: 25,
    }
  }, {
    name: 'Bunny',
    age: 25,
    friend: {
      name: 'Me',
      age: 30,
    }
  }
];

class TableContainer extends React.Component {
  render () {
    return (
      <div className='table-container'>
        <GameweekRange />
        <TableExample
          data={data}
        />
      </div>
    );
  }
}

export default TableContainer;
