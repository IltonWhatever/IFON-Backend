/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshTokenJWT(req, res, next) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err, decoded) => {
    if (err) {
      console.log('Erro ao decodificar o refresk token', err);
      return res.status(500).json({
        auth: false,
        message: 'Failed refresh-token'
      });
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    req.refreshToken = refreshToken;
    next();
  });
}

module.exports = verifyRefreshTokenJWT;
