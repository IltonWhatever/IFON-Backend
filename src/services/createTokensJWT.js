const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  createTokenJWT(payload) {
    const token = jwt.sign({ payload }, process.env.SECRET, {
      expiresIn: '2m' //  expires in 2min
    });

    return token;
  },

  createRefreshTokenJWT() {
    const refreshtoken = jwt.sign({}, process.env.REFRESHTOKEN, {});

    return refreshtoken;
  }
};
