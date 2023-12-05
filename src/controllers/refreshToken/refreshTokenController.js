const dayjs = require('dayjs');
const tokenJWT = require('../../services/createTokensJWT');
const refreshTokenRepository = require('../../repositories/refresh-token/refreshTokenRepository');

module.exports = {
  async refreshToken(req, res) {
    const refreshTokenExist = await refreshTokenRepository.find(
      req.body.refreshToken
    );

    const refreshTokenExpired = dayjs().isAfter(
      refreshTokenExist.expiration_date
    );
    if (refreshTokenExpired) {
      await refreshTokenRepository.delete(refreshTokenExist.user_id);
      // criar novo refreshtoken
      const newRefreshToken = await refreshTokenRepository.create(
        refreshTokenExist.user_id
      );
      // criando novo token
      const id = refreshTokenExist.user_id;
      const newToken = tokenJWT.createTokenJWT(id);
      return res
        .status('200')
        .json({ token: newToken, refreshToken: newRefreshToken.token });
    }

    // criando novo token
    const id = refreshTokenExist.user_id;
    const newToken = tokenJWT.createTokenJWT(id);
    return res
      .status('200')
      .json({ token: newToken, refreshToken: refreshTokenExist.token });
  }
};
