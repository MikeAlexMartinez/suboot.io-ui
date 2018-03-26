'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const FormItem = ({value}) => (
  <span className={`form-item ${value}`}></span>
);

FormItem.propTypes = {
  value: PropTypes.string.isRequired,
};

const TableNumber = ({value}) => (
  <span className='number'>{value}</span>
);

TableNumber.propTypes = {
  value: PropTypes.number,
};

// need to instantiate in TableContainer
const Table = ({ data }) => {
  const columns = [{
    Header: 'Team',
    accessor: 'teamName',
    width: 150,
  }, {
    Header: 'Played',
    accessor: 'played',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Won',
    accessor: 'won',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Drawn',
    accessor: 'draw',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Lost',
    accessor: 'lost',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'For',
    accessor: 'for',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Against',
    accessor: 'against',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Goal Difference',
    accessor: 'goal_difference',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }    
  }, {
    Header: 'Points',
    accessor: 'points',
    Cell: <TableNumber />,
    style: {
      textAlign: 'center'
    }
  }, {
    Header: 'Form',
    accessor: 'form',
    Cell: props => props.value.map((value, i) => {
      return <FormItem key={i} value={value} />;
    }),
    width: 140,
  }];
  
  return (
    <ReactTable
      data={data}
      columns={columns}

      showPagination={false}
    />
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

export default Table;
