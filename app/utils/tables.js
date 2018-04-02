'use strict';

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
function createTables({teams, fixtures, all, range, start, end, lastXGames, tables}) { 
  if (fixtures === null || fixtures.length === 0) {
    return tables;
  } else {
    
    if (tables) {

    }
    
    const [fixture, ...rest] = fixtures;
    
    

  }
  
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


  return {
    home,
    away,
    total
  }
}

function processFixture ({home, away, total}, fixture) {
  const newHome = processHomeTeam({fixture, home});
  const newAway = processAwayTeam({fixture, away});
  const intermediateTotal = processTotalHomeTeam({fixture, total});
  const newTotal = processTotalAwayTeam({fixture, total: intermediateTotal});

  return {
    home: newHome,
    away: newAway,
    total: newTotal,
  };
}

function processHomeTeam({fixture, home}) {
  
}

function processAwayTeam({fixture, away}) {

}

function processTotalHomeTeam({fixture, total}) {

}

function processTotalAwayTeam({fixture, total}) {

}

module.exports = {createTables};