const { Op } = require('sequelize');
const User = require('../../models/user/user');
const Campus = require('../../models/campi/campi');
const Permissao = require('../../models/permissao/permissao');
const Password = require('../../services/password');
const publicacaoRepository = require('../publicacao/publicacaoRepository');
const comentarioRepository = require('../comentarios/comentarioRepository');

exports.listUsers = async (paginate) => {
  const { offset, limit } = paginate;

  const users = await User.findAndCountAll({
    where: {
      is_active: true
    },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    raw: true,
    offset,
    limit
  });

  if (!users) throw Error('Nenhum usuário encontrado');

  return users;
};

exports.create = async (data) => {
  const userData = data;
  const userExsit = await User.findOne({ where: { email: userData.email } });
  if (userExsit) throw Error('Usuário já existe');

  userData.password = await Password.createhash(userData.password);

  const user = await User.create(userData);
  return user;
};

exports.find = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Campus }, { model: Permissao }]
  });
  return user;
};

exports.searchByName = async (name, paginate) => {
  const { offset, limit } = paginate;

  const users = await User.findAndCountAll({
    where: {
      name: { [Op.startsWith]: name }
    },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    raw: true,
    offset,
    limit
  });

  if (!users) throw Error('Nenhum usuário encontrado');

  return users;
};

exports.update = async (data) => {
  const userUpdate = data;
  if (userUpdate.campus_id) {
    const campusExist = await Campus.findByPk(userUpdate.campus_id);
    if (campusExist == null)
      throw Error(`Nenhum campos encontrado com o id ${userUpdate.campus_id}`);
  }

  const user = await User.update(userUpdate, {
    where: {
      id: userUpdate.id
    },

    returning: true,
    plain: true
  });
  if (!user[1]) throw Error('Error ao atualizar o usuário');

  return user;
};

exports.newPassword = async (id, data) => {
  const userExist = await User.findByPk(id, {});

  if (!userExist) throw Error('Usuário não existe');

  const newPassword = await Password.createhash(data.newPassword);

  const userNewPassword = await User.update(
    { password: newPassword },
    {
      where: {
        id
      },

      returning: true,
      plain: true
    }
  );
  if (!userNewPassword[1]) throw Error('Error ao atualizar a senha do usuário');

  return userNewPassword;
};

exports.userDelete = async (id) => {
  const user = await User.destroy({
    where: {
      id
    }
  });
  if (!user) throw Error(`Error ao deletar o usuário com o id ${id}`);
  return user;
};

exports.userDisable = async (id) => {
  const user = await User.update(
    { is_active: false },
    {
      where: {
        id
      },

      returning: true,
      plain: true
    }
  );

  if (!user[1]) throw Error(`Error ao desativar o usuário com o id ${id}`);
  const status = false;
  const isActive = false;
  // desativando as publicações do usuario
  await publicacaoRepository.updateUserPublication(id, status);
  // desativando os comentarios do usuario
  await comentarioRepository.updateUserComents(id, isActive);
  return true;
};

exports.userActive = async (id) => {
  const user = await User.update(
    { is_active: true },
    {
      where: {
        id
      },
      returning: true,
      plain: true
    }
  );

  if (!user[1]) throw Error(`Error ao ativar o usuário com o id ${id}`);
  const status = true;
  const isActive = true;
  // ativando as publicações do usuario
  await publicacaoRepository.updateUserPublication(id, status);

  // ativando os comentarios do usuario
  await comentarioRepository.updateUserComents(id, isActive);
  return true;
};

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
