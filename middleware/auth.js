const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
          res.json({ message: 'Failed to authenticate token'});
      } else {
          req.decoded = decoded;
          next();
      }    
      })
  } else {
    return res.status(403).send({ message: 'No token provided. '});
  }
}