const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY || 'defaultsecret');

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed. Unauthorized.' });
  }
};

module.exports = verifyToken;
