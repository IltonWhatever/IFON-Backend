const userRepository = require('../../repositories/user/userRepository');
require('dotenv').config();
const refreshTokenRepository = require('../../repositories/refresh-token/refreshTokenRepository');
const tokenJWT = require('../../services/createTokensJWT');
const servicePaginate = require('../../services/paginate');

module.exports = {
  async index(req, res) {
    const { page } = req.query;
    const { limit } = req.query;

    const paginate = servicePaginate.paginate(page, limit);
    try {
      const users = await userRepository.listUsers(paginate);

      return res.status('200').json(users);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async searchByName(req, res) {
    const { page } = req.query;
    const { limit } = req.query;
    const { name } = req.query;

    const paginate = servicePaginate.paginate(page, limit);
    try {
      const users = await userRepository.searchByName(name, paginate);

      return res.status('200').json(users);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async create(req, res) {
    const {
      name,
      email,
      password,
      is_ifce,
      telephone,
      permissions_id,
      campus_id
    } = req.body;

    const data = {
      name,
      email,
      password,
      is_ifce,
      telephone,
      permissions_id,
      campus_id
    };

    const user = await userRepository.create(data);

    // criar o token
    const { id } = user;

    const token = tokenJWT.createTokenJWT(id);

    const generateRefreshToken = await refreshTokenRepository.create(id);

    return res.status('200').json({
      mg: `Usuário ${user.name} cadrastado com sucesso`,
      id: user.id,
      token,
      refreshToken: generateRefreshToken.token
    });
  },

  async find(req, res) {
    const { id } = req.params;
    try {
      const user = await userRepository.find(id);
      return res.status('200').json(user);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      email,
      is_active,
      is_ifce,
      telephone,
      permissions_id,
      campus_id
    } = req.body;
    const data = {
      id,
      name,
      email,
      is_ifce,
      is_active,
      telephone,
      permissions_id,
      campus_id
    };

    await userRepository.update(data);

    return res
      .status('200')
      .json({ msg: `Usuário foi atualizada com sucesso` });
  },

  async delete(req, res) {
    const { id } = req.params;

    await userRepository.delete(id);

    return res.status('200').json('Usuário excluido da plataforma com sucesso');
  },

  async userAtcive(req, res) {
    const { id } = req.params;

    await userRepository.userActive(id);

    return res.status('200').json('Usuário ativado com sucesso');
  },

  async userDisable(req, res) {
    const { id } = req.params;

    await userRepository.userDisable(id);

    return res.status('200').json('Usuário desativado com sucesso');
  },

  async userNewPassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    const data = {
      newPassword: password
    };

    await userRepository.newPassword(id, data);

    return res.status('200').json({ msg: `Senha foi atualizada com sucesso` });
  }
};
