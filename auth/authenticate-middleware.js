/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  req.headers.authToken ? next() : console.log('no auth token provided in headers!');
  next();
  //res.status(401).json({ you: 'shall not pass!' });
};
