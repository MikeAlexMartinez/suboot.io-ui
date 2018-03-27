'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import TableSettings from './TableSettings';
import Loading from '../Loading';

import {createTables} from '../../utils/tables';
import {getTableData} from '../../utils/api';

/**
 * Settings logic:
 * 
 * rangeSelection:
 *  - all 
 */
class TableContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      max: props.max,
      rangeSelection: 'all',
      rangeStart: 1,
      rangeEnd: props.max,
      fixturesSelected: 'all',
      fixtures: [],
      upcoming: [],
      homeTable: [],
      awayTable: [],
      totalTable: [],
      teams: [],
      loading: true,
      error: false,
      errMessage: null,
    };

    this.setRange = this.setRange.bind(this);
    this.handleRangeClick = this.handleRangeClick.bind(this);
    this.handleFixturesClick = this.handleFixturesClick.bind(this);
  }

  componentDidMount() {
    getTableData()
      .then(({tableData, fixtures, teams, upcoming}) => {
        this.setState({
          fixtures: fixtures,
          homeTable: tableData.home,
          awayTable: tableData.away,
          totalTable: tableData.total,
          teams: teams,
          upcoming: upcoming,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          errMessage: err.message,
        });
      });
  }

  setRange([start, end]) {
    // if range selection is 'all' or
    // start === 1 && end === max,  
    // fetch all.
    // i.e. createTable({teams, fixtures, })
    //   else
    //
    this.setState({
      rangeStart: start,
      rangeEnd: end
    });
  }

  handleRangeClick(val) {
    // create tables
    this.setState({
      rangeSelection: val
    });
  }

  handleFixturesClick(val) {
    this.setState({
      fixturesSelected: val
    });
  }

  render () {
    const {homeTable, awayTable, totalTable, fixturesSelected, 
      loading, error} = this.state; 
    const tableData = 
      fixturesSelected === 'home'
        ? homeTable
        : fixturesSelected === 'away'
          ? awayTable
          : totalTable;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>Error creating table</p>
          <p>{this.state.errMessage}</p>
        </div>
      );
    }

    if (tableData) {
      return (
        <div className='table-container'>
          <TableSettings 
            setRange={this.setRange}
            rangeClick={this.handleRangeClick}
            fixturesClick={this.handleFixturesClick}
            {...this.state}
          />
          <Table
            data={tableData}
          />
        </div>
      );
    }
  }
}

TableContainer.propTypes = {
  max: PropTypes.number,
};

export default TableContainer;
