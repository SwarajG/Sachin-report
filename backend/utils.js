'use strict';
const moment = require('moment');
const _ = require('lodash');

const utils = {
  getYearFromString: date => moment(date, 'DD MMM YYYY').year(),
  chekcIfNumberisInRange: (number, start, end) => (_.inRange(number, start, end)),
  getIntegerRun: (run) => {
    const intRun = run.replace(/\D/g, '');
    return (intRun !== '') ? parseInt(intRun, 10) : 0;
  },
  checkIfKeyIsPresent: (object, key) => ({}.hasOwnProperty.call(object, key)),
};

module.exports = utils;
