import nano from 'nano';
import '../../config/config';

// database url config variables
const config = global.gConfig;

const url = config.db_config.db_url;
const port = config.db_config.db_port;
const user = config.db_config.db_user;
const pass = config.db_config.db_pass;
const protocol = config.db_config.db_protocol;

console.log('db_url', url);

module.exports = nano(`${protocol}${user}:${pass}@${url}:${port}`);

// "http://admin:admin@127.0.0.1:5984"
// process.env.COUCHDB_URL
