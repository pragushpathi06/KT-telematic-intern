const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Access Denied: No Token Provided');
  }

  jwt.verify(token, 'f6$4Jd!p0#Wq9m@Z', (err, user) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    }

    // Store the user info in the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
