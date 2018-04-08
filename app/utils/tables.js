'use strict';

import { compose } from 'redux';

/**
 * this will contain an algorithm to construct home, away, or total
 * league tables based on the fixtures data, and setting present
 * with the table container component.
 * @param {object.array} teams - array of all teams
 * @param {object.array} fixtures - array of fixtures to date
 * @param {object.boolean} all - tells us to calculate all played matches
 * @param {object.boolean} range - tells us whether to use a range
 * @param {object.number} start - the gameweek to start from
 *  (when range is true)
 * @param {object.number} end - the gameweek to end at (when range is true)
 * @param {object.number} lastXGames - number of games to use to calculate
 *   fixtures
 * @return {object}
 * @return {object.home} - table using just home games
 * @return {object.away} - table using just away games
 * @return {object.total} - table using all games.
 */
function createTables({teams, fixtures, all, range, start, end, lastXGames}) {
  // define respective object pieces that will be returned.
  let home = teams.reduce((a, b) => {
    a[b.short_name] = {
      teamName: b.name,
      played: 0,
      won: 0,
      draw: 0,
      lost: 0,
      for: 0,
      against: 0,
      points: 0,
      form: [],
    };
    return a;
  }, {});
  let away = {...home};
  let total = {...home};

  let tables = {
    home, away, total
  };

  const options = {all, range, start, end, lastXGames};

  fixtures.forEach((f) => {
    tables = processFixture(tables, f, options);
  });

  // need to add goal difference, and 'arrayify' sorted results;
  const {home: homeTable, away: awayTable, total: totalTable} = tables;

  return {
    home: compose(sortTable, addGoalDifference, arrayify)(homeTable),
    away: compose(sortTable, addGoalDifference, arrayify)(awayTable),
    total: compose(sortTable, addGoalDifference, arrayify)(totalTable),
  };
}

/**
 * takes an object of objects and returns an array of the passed objects
 * objects, with the key embedded.
 * @param {object} obj
 * @return {array}
 */
function arrayify(obj) {
  return Object.keys(obj).map((key) => {
    return {
      ...obj[key],
      key,
    };
  });
}


/**
 * takes array and adds goal difference for each item
 * @param {array} table
 * @return {array}
 */
function addGoalDifference(table) {
  return table.map((team) => ({
    ...team,
    goal_difference: team.for - team.against,
  }));
}

/**
 * Sort Table, takes array and sorts league table array accordingly
 * @param {array} arr
 * @return {array}
 */
function sortTable(arr) {
  return arr.sort((a, b) => {
    // points hightest desc
    if (b.points < a.points) {
      return -1;
    } else if (a.points < b.points) {
      return 1;
    } else {
      // goal difference desc
      if (b.goal_difference < a.goal_difference) {
        return -1;
      } else if (a.goal_difference < b.goal_difference) {
        return 1;
      } else {
        // goals for desc
        if (b.for < a.for) {
          return -1;
        } else if (a.for < b.for) {
          return 1;
        } else {
          // team name (lowercase) asc
          let aName = a.teamName.toLowerCase();
          let bName = b.teamName.toLowerCase();

          if (aName < bName) {
            return -1;
          } else {
            return 1;
          }
        }
      }
    }
  });
}

function processFixture ({home, away, total}, fixture, options) {
  const newHome = processHomeTeam({fixture, home, options});
  const newAway = processAwayTeam({fixture, away, options});
  const intermediateTotal = processTotalHomeTeam({fixture, total, options});
  const newTotal = processTotalAwayTeam({fixture, total: intermediateTotal, options});

  return {
    home: newHome,
    away: newAway,
    total: newTotal,
  };
}

function processHomeTeam({fixture, home, options}) {
  const {all, range, start, end, lastXGames} = options;
  const result = checkResult(fixture.result, 'home');
  const team = home[fixture.home_team_short];
  const newTeam = {...team};

  if (all || 
    (range === true &&
      fixture.gameweek_id >= start &&
      fixture.gameweek_id <= end) ||
    (lastXGames && 
      team.played < lastXGames)
  ) {
    newTeam.played = team.played + 1;
    newTeam.won = team.won + (result === 'W' ? 1 : 0);
    newTeam.draw = team.draw + (result === 'D' ? 1 : 0);
    newTeam.lost = team.lost + (result === 'L' ? 1 : 0);
    newTeam.for = team.for + fixture.home_fix_goals;
    newTeam.against = team.against + fixture.away_fix_goals;
    newTeam.points = team.points + fixture.home_fix_points;
    newTeam.form = team.form.concat([result]);
  }

  return {
    ...home,
    [fixture.home_team_short]: newTeam,
  };
}

function processAwayTeam({fixture, away, options}) {
  const {all, range, start, end, lastXGames} = options;
  const result = checkResult(fixture.result, 'away');
  const team = away[fixture.away_team_short];
  const newTeam = {...team};

  if (all || 
    (range === true &&
      fixture.gameweek_id >= start &&
      fixture.gameweek_id <= end) ||
    (lastXGames && 
      team.played < lastXGames)
  ) {
    newTeam.played = team.played + 1;
    newTeam.won = team.won + (result === 'W' ? 1 : 0);
    newTeam.draw = team.draw + (result === 'D' ? 1 : 0);
    newTeam.lost = team.lost + (result === 'L' ? 1 : 0);
    newTeam.for = team.for + fixture.away_fix_goals;
    newTeam.against = team.against + fixture.home_fix_goals;
    newTeam.points = team.points + fixture.away_fix_points;
    newTeam.form = team.form.concat([result]);
  }

  return {
    ...away,
    [fixture.away_team_short]: newTeam,
  };
}

function processTotalHomeTeam({fixture, total, options}) {
  const {all, range, start, end, lastXGames} = options;
  const result = checkResult(fixture.result, 'home');
  const team = total[fixture.home_team_short];
  const newTeam = {...team};

  if (all || 
    (range === true &&
      fixture.gameweek_id >= start &&
      fixture.gameweek_id <= end) ||
    (lastXGames && 
      team.played < lastXGames)
  ) {
    newTeam.played = team.played + 1;
    newTeam.won = team.won + (result === 'W' ? 1 : 0);
    newTeam.draw = team.draw + (result === 'D' ? 1 : 0);
    newTeam.lost = team.lost + (result === 'L' ? 1 : 0);
    newTeam.for = team.for + fixture.home_fix_goals;
    newTeam.against = team.against + fixture.away_fix_goals;
    newTeam.points = team.points + fixture.home_fix_points;
    newTeam.form = team.form.concat([result]);
  }

  return {
    ...total,
    [fixture.home_team_short]: newTeam,
  };
}

function processTotalAwayTeam({fixture, total, options}) {
  const {all, range, start, end, lastXGames} = options;
  const result = checkResult(fixture.result, 'away');
  const team = total[fixture.away_team_short];
  const newTeam = {...team};

  if (all || 
    (range === true &&
      fixture.gameweek_id >= start &&
      fixture.gameweek_id <= end) ||
    (lastXGames && 
      team.played < lastXGames)
  ) {
    newTeam.played = team.played + 1;
    newTeam.won = team.won + (result === 'W' ? 1 : 0);
    newTeam.draw = team.draw + (result === 'D' ? 1 : 0);
    newTeam.lost = team.lost + (result === 'L' ? 1 : 0);
    newTeam.for = team.for + fixture.away_fix_goals;
    newTeam.against = team.against + fixture.home_fix_goals;
    newTeam.points = team.points + fixture.away_fix_points;
    newTeam.form = team.form.concat([result]);
  }

  return {
    ...total,
    [fixture.away_team_short]: newTeam,
  };
}

function checkResult(result, homeOrAway) {
  if (result === 'SD' || result === 'ND') {
    return 'D';
  }
  if (result === 'HW') {
    if (homeOrAway === 'home') {
      return 'W';
    } else {
      return 'L';
    }
  }
  if (result === 'AW') {
    if (homeOrAway === 'home') {
      return 'L';
    } else {
      return 'W';
    }
  }
}

module.exports = {
  createTables,
  processFixture,
  processHomeTeam,
  processAwayTeam,
  processTotalHomeTeam,
  processTotalAwayTeam
};