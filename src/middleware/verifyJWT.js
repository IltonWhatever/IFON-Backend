const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  const [, authToken] = token.split(' ');
  jwt.verify(authToken, process.env.SECRET, function (err) {
    if (err)
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token' });

    // se tudo estiver ok, salva no request para uso posterior
    // req.userId = decoded.id;
    next();
  });
  return true;
}

module.exports = verifyJWT;
