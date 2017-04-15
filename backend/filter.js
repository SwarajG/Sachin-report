// @flow
// Npm modules
'use strict';
const _ = require('lodash');

// Util
const Utils = require('./utils');

const filter = {
  groupByTeam: playerInfo =>
    _.chain(playerInfo)
    .groupBy('opposition')
    .value(),

  groupByResult: playerInfo =>
    _.chain(playerInfo)
    .groupBy('match_result')
    .value(),

  getFilteredByResultWithTeam: (groupByTeam) => {
    const filteredObject = {};
    for (const team in groupByTeam) {
      if (Utils.checkIfKeyIsPresent(groupByTeam, team)) {
        filteredObject[team] = _.filter(groupByTeam[team], o => Utils.getIntegerRun(o.batting_score) >= 100);
      }
    }
    return filteredObject;
  },

  getYearWiseAverage: (playerInfo) => {
    const filteredObject = {};
    const finalObject = {};
    playerInfo.forEach((matchInfo) => {
      const year = Utils.getYearFromString(matchInfo.date);
      if (filteredObject[year] === undefined) {
        filteredObject[year] = [];
      }
      const run = Utils.getIntegerRun(matchInfo.batting_score);
      filteredObject[year].push(run);
    });
    for (const year in filteredObject) {
      if (Utils.checkIfKeyIsPresent(filteredObject, year)) {
        finalObject[year] = _.mean(filteredObject[year]).toFixed(2);
      }
    }
    return finalObject;
  },

  moreThanFiftyVsEachTeam: (groupByResult) => {
    const filteredObject = {};
    for (const gameStatus in groupByResult) {
      if (Utils.checkIfKeyIsPresent(groupByResult, gameStatus)) {
        const gameStatusObject = _.groupBy(groupByResult[gameStatus], 'opposition');
        const filterdTemp = {};
        for (const team in gameStatusObject) {
          if (Utils.checkIfKeyIsPresent(gameStatusObject, team)) {
            const teamArray = gameStatusObject[team];
            filterdTemp[team] = _.filter(teamArray, o => Utils.getIntegerRun(o.batting_score) >= 50);
          }
        }
        filteredObject[gameStatus] = filterdTemp;
      }
    }
    return filteredObject;
  },

  getAverageVsEachTeam: (playerInfo) => {
    const filteredObject = {};
    const teamList = _.groupBy(playerInfo, 'opposition');
    for (const team in teamList) {
      if (Utils.checkIfKeyIsPresent(teamList, team)) {
        teamList[team].forEach((matchInfo) => {
          if (filteredObject[team] === undefined) {
            filteredObject[team] = [];
          }
          filteredObject[team].push(Utils.getIntegerRun(matchInfo.batting_score));
        });
      }
    }
    for (const team in filteredObject) {
      if (Utils.checkIfKeyIsPresent(filteredObject, team)) {
        filteredObject[team] = _.mean(filteredObject[team]).toFixed(2);
      }
    }
    return filteredObject;
  },

};

module.exports = filter;
