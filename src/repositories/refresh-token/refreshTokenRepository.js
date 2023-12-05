const dayjs = require('dayjs');
const tokenJWT = require('../../services/createTokensJWT');
const RefreshToken = require('../../models/refresh-token/refresh-token');

exports.create = async (userId) => {
  const expirationDate = dayjs().add(1, 'month');
  const refreshtoken = tokenJWT.createRefreshTokenJWT();
  const token = {
    token: refreshtoken,
    expiration_date: expirationDate,
    user_id: userId
  };
  const generateRefreshToken = await RefreshToken.create(token);
  return generateRefreshToken;
};

exports.find = async (token) => {
  const tokenREfreshExist = await RefreshToken.findOne({
    where: {
      token
    }
  });

  if (!tokenREfreshExist) throw Error('Refresh token inválido.');

  return tokenREfreshExist;
};

exports.delete = async (tokenId) => {
  const refreshTokenDeleted = await RefreshToken.destroy({
    where: {
      user_id: tokenId
    }
  });

  if (!refreshTokenDeleted) throw Error('Refresh token não pode ser deletado');

  return refreshTokenDeleted;
};
