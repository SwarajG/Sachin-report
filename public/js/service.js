import { raiseStatus, HTTP } from './Http';

const getPlayerInfo = (startYear, endYear) => (
  fetch(`/player?start=${startYear}&end=${endYear}`, {
    method: HTTP.GET,
  })
  .then(raiseStatus)
);
module.exports = getPlayerInfo;
