const User = require('../../models/user/user');
const Password = require('../../services/password');

exports.findUser = async ({ email, password }) => {
  const userExsit = await User.findOne({ where: { email } });

  if (!userExsit) throw Error('Email ou Senha incorreta');

  const isCorrectPassword = await Password.compareHash(
    password,
    userExsit.password
  );

  if (!isCorrectPassword) throw Error('Email ou Senha incorreta');

  return userExsit;
};

exports.findUserGoogle = async ({ email }) => {
  const userExsit = await User.findOne({ where: { email } });

  if (!userExsit) return false;

  return userExsit;
};
