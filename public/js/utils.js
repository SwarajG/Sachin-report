const utils = {
  getSortedKeyList: (object) => {
    const keyList = [];
    for (const key in object) {
      if ({}.hasOwnProperty.call(object, key)) {
        keyList.push(key);
      }
    }
    return keyList.sort();
  },
};

module.exports = utils;
