const { processHomeTeam,
  processAwayTeam,
  processTotalHomeTeam, 
  processTotalAwayTeam,
  processFixture,
  createTables } = require('../../app/utils/tables');
const assert = require('assert');

const fixtures = require('./data/testFixtureData.json');
const emptyTables = require('./data/emptyTables.json');
const teams = require('./data/testTeamData.json');
const testTables = require('./data/tableExpressions.json');

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

      // should only process away liverpool fixtures betweem GW5 and GW9 inclusive.
      // fixtures 89, 70 and 53 qualify
      const afterLiv = {
        'teamName': 'Liverpool',
        'played': 3,
        'won': 1,
        'draw': 1,
        'lost': 1,
        'for': 5,
        'against': 7,
        'points': 4,
        'form': ['L', 'D', 'W'] // most recent game at beginning of array
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
      // fixtures 292. 275, 257, 237 and 219 qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 3,
        'draw': 2,
        'lost': 0,
        'for': 10,
        'against': 4,
        'points': 11,
        'form': ['W', 'W', 'D', 'D', 'W'] // most recent game at beginning of array
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

      // should only process last 5 away matches
      // played by spurs
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 3,
        'draw': 2,
        'lost': 0,
        'for': 10,
        'against': 4,
        'points': 11,
        'form': ['W', 'W', 'D', 'D', 'W'] // most recent game at beginning of array
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

  describe('processTotalHomeTeam()', () => {

    test('when all is true', () => {

      const options = {all: true};
      const total = {...emptyTables.total};
      const fixture = fixtures[0];
      const newTotal = processTotalHomeTeam({fixture, total, options});
      
      const liverpoolTotal = {
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
        newTotal['LIV'],
        liverpoolTotal,
        'Home table should have processed Liverpool win'
      );
    });

    test('with range of 5 to 9 (Liverpool)', () => {

      const options = {all: false, range: true, start: 5, end: 9};
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'LIV');
      let newTotal = {...total};

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
        newTotal = processTotalHomeTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['LIV'],
        afterLiv,
        'should only process fixtures with gameweek_id between 5 and 9 inclusive'
      );

    });

    test('with range of 20 to 30 (Spurs)', () => {

      const options = {all: false, range: true, start: 20, end: 30};
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'TOT');
      let newTotal = {...total};

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
        newTotal = processTotalHomeTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['TOT'],
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
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.home_team_short === 'TOT');
      let newTotal = {...total};

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
        newTotal = processTotalHomeTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['TOT'],
        afterTot,
        'should only process last 5 home fixtures for Spurs'
      );

    });
  });

  describe('processTotalAwayTeam()', () => {

    test('when all is true', () => {

      const options = {all: true};
      const total = {...emptyTables.total};
      const fixture = fixtures[0];
      const newTotal = processTotalAwayTeam({fixture, total, options});
      
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
        newTotal['WAT'],
        watfordAway,
        'Total table should have processed Watford Loss'
      );
    });

    test('with range of 5 to 9 (Liverpool)', () => {

      const options = {all: false, range: true, start: 5, end: 9};
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'LIV');
      let newTotal = {...total};

      // should only process away liverpool fixtures betweem GW5 and GW9 inclusive.
      // fixtures 89, 70 and 53 qualify
      const afterLiv = {
        'teamName': 'Liverpool',
        'played': 3,
        'won': 1,
        'draw': 1,
        'lost': 1,
        'for': 5,
        'against': 7,
        'points': 4,
        'form': ['L', 'D', 'W'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newTotal = processTotalAwayTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['LIV'],
        afterLiv,
        'should only process away, Liverpool fixtures with gameweek_id between 5 and 9 inclusive'
      );

    });

    test('with range of 20 to 30 (Spurs)', () => {

      const options = {all: false, range: true, start: 20, end: 30};
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'TOT');
      let newTotal = {...total};

      // should only process home fixtures betweem GW20 and GW30 inclusive.
      // fixtures 292. 275, 257, 237 and 219 qualify
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 3,
        'draw': 2,
        'lost': 0,
        'for': 10,
        'against': 4,
        'points': 11,
        'form': ['W', 'W', 'D', 'D', 'W'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newTotal = processTotalAwayTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['TOT'],
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
      const total = {...emptyTables.total};
      const fixtureArr = fixtures.filter((f) => f.away_team_short === 'TOT');
      let newTotal = {...total};

      // should only process last 5 away matches
      // played by spurs
      const afterTot = {
        'teamName': 'Spurs',
        'played': 5,
        'won': 3,
        'draw': 2,
        'lost': 0,
        'for': 10,
        'against': 4,
        'points': 11,
        'form': ['W', 'W', 'D', 'D', 'W'] // most recent game at beginning of array
      };

      fixtureArr.forEach((fixture) => {
        newTotal = processTotalAwayTeam({ fixture, total: newTotal, options});
      });

      assert.deepEqual(
        newTotal['TOT'],
        afterTot,
        'should only process last 5 away fixtures for Spurs'
      );

    });
  });

  describe('processFixture()', () => {

    test('Update tables with a single fixture', () => {

      const options = {
        all: true
      };
      const tables = {...emptyTables};
      const fixture = fixtures[0];

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

      const newTables = processFixture(tables, fixture, options);
      const {home, away, total} = newTables;

      assert.deepEqual(
        home['LIV'],
        liverpoolHome,
        'expect home table to update Liverpool properly'
      );

      assert.deepEqual(
        away['WAT'],
        watfordAway,
        'expect away table to update Watford properly'
      );

      assert.deepEqual(
        total['LIV'],
        liverpoolHome,
        'expect total table to update Liverpool properly'
      );

      assert.deepEqual(
        total['WAT'],
        watfordAway,
        'expect total table to update Watford properly'
      );
    });
  });

  describe('createTables()', () => {

    test('create tables with all available fixtures', () => {
      const tables = createTables({
        teams, fixtures, all: true
      });
      const {home, away, total} = tables;
      const {home: testHome, away: testAway, total: testTotal} = testTables.all;

      assert.deepEqual(
        home[0],
        testHome.manCity,
        'expect home table to have correct stats for Man City'
      );

      assert.deepEqual(
        total[0],
        testTotal.manCity,
        'expect total table to have correct stats for Man City'
      );

      assert.deepEqual(
        away[0],
        testAway.manCity,
        'expect away table to have correct stats for Man City'
      );

      assert.deepEqual(
        home[19],
        testHome.westBrom,
        'expect home table to have correct stats for West Brom'
      );

      assert.deepEqual(
        away[19],
        testAway.westBrom,
        'expect away table to have correct stats for West Brom'
      );

      assert.deepEqual(
        total[19],
        testTotal.westBrom,
        'expect total table to have correct stats for West Brom'
      );

    });

    test('create tables with range of fixtures (11-20)', () => {
      const tables = createTables({
        teams,
        fixtures,
        all: false,
        range: true,
        start: 11,
        end: 20
      });
      const {home, away, total} = tables;
      const {home: testHome, away: testAway, total: testTotal} = testTables.range;

      assert.deepEqual(
        home[0],
        testHome.manCity,
        'expect home table to have correct stats for Man City'
      );

      assert.deepEqual(
        total[0],
        testTotal.manCity,
        'expect total table to have correct stats for Man City'
      );

      assert.deepEqual(
        away[0],
        testAway.manCity,
        'expect away table to have correct stats for Man City'
      );

      assert.deepEqual(
        home[19],
        testHome.newcastle,
        'expect home table to have correct stats for Newcastle'
      );

      assert.deepEqual(
        away[12],
        testAway.newcastle,
        'expect away table to have correct stats for Newcastle'
      );

      assert.deepEqual(
        total[19],
        testTotal.newcastle,
        'expect total table to have correct stats for Newcastle'
      );

    });

    test('create tables with lastXGames (x being 5)', () => {
      const tables = createTables({
        teams,
        fixtures,
        all: false,
        range: false,
        lastXGames: 5,
      });
      const {home, away, total} = tables;
      const {home: testHome, away: testAway, total: testTotal} = testTables.lastX;

      assert.deepEqual(
        home[0],
        testHome.manCity,
        'expect home table to have correct stats for Man City'
      );

      assert.deepEqual(
        total[0],
        testTotal.manCity,
        'expect total table to have correct stats for Man City'
      );

      assert.deepEqual(
        away[3],
        testAway.manCity,
        'expect away table to have correct stats for Man City'
      );

      assert.deepEqual(
        home[1],
        testHome.liverpool,
        'expect home table to have correct stats for Liverpool'
      );

      assert.deepEqual(
        away[1],
        testAway.liverpool,
        'expect away table to have correct stats for Liverpool'
      );

      assert.deepEqual(
        total[2],
        testTotal.liverpool,
        'expect total table to have correct stats for Liverpool'
      );

    });
  });
});