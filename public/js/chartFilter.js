// Utils
import Utils from './utils';

const chartFilter = {
  getInfoForAverageRunVsTeam: (avgScoreAgainstTeam) => {
    const data = [
      ['team', 'avgRun'],
    ];
    const teamArray = Utils.getSortedKeyList(avgScoreAgainstTeam);
    teamArray.forEach(teamName =>
      data.push([
        teamName,
        parseFloat(avgScoreAgainstTeam[teamName], 10),
      ])
    );
    return data;
  },

  getTonAgainstEachTeam: (tonAgainstEachTeam) => {
    const data = [
      ['team', 'century'],
    ];
    const teamArray = Utils.getSortedKeyList(tonAgainstEachTeam);
    teamArray.forEach(teamName =>
      data.push([
        teamName,
        parseInt(tonAgainstEachTeam[teamName].length, 10),
      ])
    );
    return data;
  },

  getYearWiseAverage: (yearWiseAverage) => {
    const data = [
      ['year', 'average'],
    ];
    const yearArray = Utils.getSortedKeyList(yearWiseAverage);
    yearArray.forEach((year) => {
      const lastTwoCharForYear = year.slice(2, 4);
      data.push([
        `'${lastTwoCharForYear}`,
        parseFloat(yearWiseAverage[year], 10),
      ]);
    });
    return data;
  },

};
module.exports = chartFilter;
