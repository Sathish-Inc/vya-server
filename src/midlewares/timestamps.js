import moment from 'moment';

export default (req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdOn = moment().format('DD-MMM-YYYY');
  }
  next();
};
