'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from './Table';
import TableSettings from './TableSettings';
import {createTables} from '../../utils/tables';
import {getTableData} from '../../utils/api';
import Loading from '../Loading';

import testData from '../../../__tests__/tableData';

class TableContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rangeSelection: 'all',
      rangeStart: 0,
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
    this.setState({
      rangeStart: start,
      rangeEnd: end
    });
  }

  handleRangeClick(val) {
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
