'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// need to instantiate in TableContainer
const TableExample = ({ data }) => {
  const columns = [{
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span>, // Custom Cell Components
  }, {
    id: 'friendName', // id is required as accessor isn't a string
    Header: 'Friend Name',
    accessor: d => d.friend.name, // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components
    accessor: 'friend.age'
  }];
  
  return (
    <ReactTable
      data={data}
      columns={columns}
    />
  );
};

TableExample.propTypes = {
  data: PropTypes.array,
};

export default TableExample;
