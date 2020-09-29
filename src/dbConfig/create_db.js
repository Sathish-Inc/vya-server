import couch from './couchdb';

export const createDb = async (dbName) => {
  try {
    await couch.db.create(dbName, { partitioned: true });
    return true;
  } catch (err) {
    if (err && err.statusCode !== 412) {
      console.error(err);
      return false;
    }
    return true;
  }
};
