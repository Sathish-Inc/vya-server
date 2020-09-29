import '../config/config';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
// import passport from "passport";

// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// ********************* Routes ************************** //
import timestamp from './midlewares/timestamps.js';
import vessel from './routes/vessel/vessel';
// ********************* Routes ************************** //

// ********************* CouchDb Instance ************************** //
import initCouch from './dbConfig/init_couch';

require('express-group-routes');

const app = express();

initCouch((err) => {
  if (err) {
    throw err;
  } else {
    console.log('couchdb initialized');
  }
});

// middlewares
dotenv.config();

app.use(cors());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timestamp);

const config = global.gConfig;

// Defined Routes

app.group('/api', (router) => {
  router.use('/vessel', vessel);
});

// const passportOpts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_ACCESS_SECRET,
// };

// passport.use(
//   new JwtStrategy(passportOpts, function (jwtPayload, done) {
//     const expirationDate = new Date(jwtPayload.exp * 1000);
//     if (expirationDate < new Date()) {
//       return done(null, false);
//     }
//     done(null, jwtPayload);
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

const PORT = config.server_config.listen_port;

const server = app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

// export const io = require("socket.io").listen(server);
