const { processHomeTeam,
  processAwayTeam } = require('../../app/utils/tables');
const assert = require('assert');

const fixtures = require('./data/testFixtureData.json');
const emptyTables = require('./data/emptyTables.json');

describe('createTables functions', () => {
  describe('processHomeTeam()', () => {

    test('when all is true', () => {

      const options = {all: true};
      const home = {...emptyTables.home};
      const fixture = fixtures[0];
      const newHome = processHomeTeam({fixture, home, options});
      
      const liverpoolHome = {
        'teamName': 'Liverpool',
        'played': 1,
        'won': 1,
        'draw': 0,
        'lost': 0,
        'for': 5,
        'against': 0,
        'points': 3,
        'form': ['W']
      };

      assert.deepEqual(
        newHome['LIV'],
        liverpoolHome,
        'Home table should have processed Liverpool win'
      );
    });

    test('with range of 5 to 9 (Liverpool)', () => {

      const options = {all: false, range: true, start: 5, end: 9};
      const home = {...emptyTables.home};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'LIV');
      let newHome = {...home};

      // should only process home fixtures betweem GW5 and GW9 inclusive.
      // fixtures 75 and 44 qualify
      const afterLiv = {
        'teamName': 'Liverpool',
        'played': 2,
        'won': 0,
        'draw': 2,
        'lost': 0,
        'for': 1,
        'against': 1,
        'points': 2,
        'form': ['D','D'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newHome = processHomeTeam({ fixture, home: newHome, options});
      });

      assert.deepEqual(
        newHome['LIV'],
        afterLiv,
        'should only process fixtures with gameweek_id between 5 and 9 inclusive'
      );

    });

    test('with range of 20 to 30 (Spurs)', () => {

      const options = {all: false, range: true, start: 20, end: 30};
      const home = {...emptyTables.home};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'TOT');
      let newHome = {...home};

      // should only process home fixtures betweem GW5 and GW9 inclusive.
      // fixtures 289, 269, 250, 228, 208 and 198 qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 6,
        'won': 5,
        'draw': 1,
        'lost': 0,
        'for': 15,
        'against': 3,
        'points': 16,
        'form': ['W','W','W','W','D','W'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newHome = processHomeTeam({ fixture, home: newHome, options});
      });

      assert.deepEqual(
        newHome['TOT'],
        afterTot,
        'should only process home fixtures with gameweek_id between 20 and 30 inclusive'
      );

    });

    test('with lastXGames set to 5', () => {

      const options = {
        all: false,
        range: false,
        lastXGames: 5
      };
      const home = {...emptyTables.home};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'TOT');
      let newHome = {...home};

      // should only process last 5 home matches.
      // fixtures 289, 269, 250, 228 and 208 qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 4,
        'draw': 1,
        'lost': 0,
        'for': 10,
        'against': 1,
        'points': 13,
        'form': ['W','W','W','W','D'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newHome = processHomeTeam({ fixture, home: newHome, options});
      });

      assert.deepEqual(
        newHome['TOT'],
        afterTot,
        'should only process last 5 home fixtures for Spurs'
      );

    });
  });

  describe('processAwayTeam()', () => {

    test('when all is true', () => {

      const options = {all: true};
      const away = {...emptyTables.away};
      const fixture = fixtures[0];
      const newAway = processAwayTeam({fixture, away, options});
      
      const watfordAway = {
        'teamName': 'Watford',
        'played': 1,
        'won': 0,
        'draw': 0,
        'lost': 1,
        'for': 0,
        'against': 5,
        'points': 0,
        'form': ['L']
      };

      assert.deepEqual(
        newAway['WAT'],
        watfordAway,
        'Away table should have processed Watford Loss'
      );
    });

    test('with range of 5 to 9 (Liverpool)', () => {

      const options = {all: false, range: true, start: 5, end: 9};
      const away = {...emptyTables.away};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'LIV');
      let newAway = {...away};

      // should only process home fixtures betweem GW5 and GW9 inclusive.
      // fixtures 75 and 44 qualify
      const afterLiv = {
        'teamName': 'Liverpool',
        'played': 2,
        'won': 0,
        'draw': 2,
        'lost': 0,
        'for': 1,
        'against': 1,
        'points': 2,
        'form': ['D','D'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newAway = processAwayTeam({ fixture, away: newAway, options});
      });

      assert.deepEqual(
        newAway['LIV'],
        afterLiv,
        'should only process away, Liverpool fixtures with gameweek_id between 5 and 9 inclusive'
      );

    });

    test('with range of 20 to 30 (Spurs)', () => {

      const options = {all: false, range: true, start: 20, end: 30};
      const away = {...emptyTables.away};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'TOT');
      let newAway = {...away};

      // should only process home fixtures betweem GW20 and GW30 inclusive.
      // fixtures  and  qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 6,
        'won': 5,
        'draw': 1,
        'lost': 0,
        'for': 15,
        'against': 3,
        'points': 16,
        'form': ['W','W','W','W','D','W'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newAway = processAwayTeam({ fixture, away: newAway, options});
      });

      assert.deepEqual(
        newAway['TOT'],
        afterTot,
        'should only process away fixtures with gameweek_id between 20 and 30 inclusive'
      );

    });

    test('with lastXGames set to 5', () => {

      const options = {
        all: false,
        range: false,
        lastXGames: 5
      };
      const away = {...emptyTables.away};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'TOT');
      let newAway = {...away};

      // should only process last spurs 5 away matches.
      // fixtures  qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 4,
        'draw': 1,
        'lost': 0,
        'for': 10,
        'against': 1,
        'points': 13,
        'form': ['W','W','W','W','D'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newAway = processAwayTeam({ fixture, away: newAway, options});
      });

      assert.deepEqual(
        newAway['TOT'],
        afterTot,
        'should only process last 5 away fixtures for Spurs'
      );

    });
  });
});