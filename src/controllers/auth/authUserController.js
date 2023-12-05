const authRepositoy = require('../../repositories/auth/authUserRepository');
const refreshTokenRepository = require('../../repositories/refresh-token/refreshTokenRepository');
const tokenJWT = require('../../services/createTokensJWT');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const userAuth = await authRepositoy.findUser({ email, password });

    const { id, name } = userAuth;

    const token = tokenJWT.createTokenJWT(id);
    const refreshToken = await refreshTokenRepository.create(id);

    return res
      .status('200')
      .json({ id, name, email, token, refreshToken: refreshToken.token });
  },

  async logout(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error('Refresh-token é necessário.');
    const refreshTokenExist = await refreshTokenRepository.find(refreshToken);

    await refreshTokenRepository.delete(refreshTokenExist.user_id);

    return res.status(200).json({
      message: 'Logout Relizado com sucesso'
    });
  }
};
