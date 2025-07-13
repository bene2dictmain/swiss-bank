const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  console.log('Received Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('JWT verify error:', err);
    res.status(401).json({ msg: 'Token invalid' });
  }
};
