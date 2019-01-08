'use strict';
const File = require('./file');
const MySQL = require('./mysql');
const MongoDB = require('./mongo');
module.exports = (type, db) => {
  switch (type) {
    case 'mysql':
      return new MySQL(db);
    case 'mongo':
      return new MongoDB();
    default:
      return new File();
  }
};