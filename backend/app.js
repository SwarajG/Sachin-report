'use strict';
const csv = require('csvtojson');
const Utils = require('./utils');
const Filter = require('./filter');

const csvFilePath = './sachin.csv';
const getPlayerInfo = (startYear, endYear, callback) => {
  const playerInfo = [];
  csv()
  .fromFile(csvFilePath)
  .on('json', (jsonObj) => {
    const year = Utils.getYearFromString(jsonObj.date);
    if (Utils.chekcIfNumberisInRange(year, startYear, endYear)) {
      playerInfo.push(jsonObj);
    }
  })
  .on('done', (error) => {
    const groupByTeam = Filter.groupByTeam(playerInfo);
    const groupByResult = Filter.groupByResult(playerInfo);
    const filteredPlayerInfo = {
      tonAgainstEachTeam: Filter.getFilteredByResultWithTeam(groupByTeam),
      avgScoreAgainstTeam: Filter.getAverageVsEachTeam(playerInfo),
      yearWiseAverage: Filter.getYearWiseAverage(playerInfo),
      moreThanFiftyAndresult: Filter.moreThanFiftyVsEachTeam(groupByResult),
    };
    callback(error, filteredPlayerInfo);
  });
};

module.exports = { getPlayerInfo };
