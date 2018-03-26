const axios = require('axios');
const {createTables} = require('./tables');

function getTeams() {
  return axios.get('http://localhost:3030/v1/api/teams/shortnames')
    .then(({data}) => {
      const teams = data.data;
      return teams;
    });
}

function getFixtures() {
  return axios.get('http://localhost:3030/v1/api/fixtures')
    .then(({data: { data: { finished, upcoming }}}) => {
      return {finished, upcoming};
    });
}

function createDefaultTable({teams, fixtures}) {
  return createTables({
    teams,
    fixtures,
    all: true,
  });
}

function getTableData () {
  return new Promise((res, rej) => {
    return axios.all([
      getTeams(),
      getFixtures()
    ])
      .then(([teams, {finished, upcoming}]) => {
        let tableData = createDefaultTable({fixtures: finished, teams}); 
        res({tableData, fixtures: finished, teams, upcoming});
      })
      .catch((err) => {
        console.error(err); 
        rej(err);
      });
  });
}

module.exports = {
  getTableData,
};
