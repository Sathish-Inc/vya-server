import async from 'async';
import couch from './couchdb';
import '../../config/config';

const config = global.gConfig;

const central_Db = config.db_config.central_db;

const databases = [central_Db];

module.exports = initCouch;

function initCouch(cb) {
  createDatabases(cb);
}

function createDatabases(cb) {
  async.each(databases, createDatabase, cb);
}

function createDatabase(db, cb) {
  couch.db.create(db, { partitioned: true }, (err) => {
    if (err && err.statusCode == 412) {
      err = null;
    }
    cb(err);
  });
}
