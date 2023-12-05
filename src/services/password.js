const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createhash = async (password) => {
  try {
    const senha = await bcrypt.hash(password, saltRounds);
    return senha;
  } catch (error) {
    return error;
  }
};

exports.compareHash = async (password, userPasswordHash) => {
  try {
    const senha = await bcrypt.compare(password, userPasswordHash);
    if (senha) {
      return senha;
    }

    return false;
  } catch (error) {
    return error;
  }
};
