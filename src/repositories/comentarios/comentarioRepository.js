const Comentario = require('../../models/comentario/comentario');

exports.listComentarios = async () => {
  const comentarios = await Comentario.findAll({});
  return comentarios;
};

exports.create = async (data) => {
  const comentario = await Comentario.create(data);
  return comentario;
};

exports.find = async (id) => {
  const comentario = await Comentario.findByPk(id);
  if (!comentario) throw Error(`Comentario com id:${id} não existe`);
  return comentario;
};

exports.findAll = async (id) => {
  const comentario = await Comentario.findAndCountAll({
    where: { publications_id: id },
    attributes: { exclude: ['publications_id'] },
    raw: true
  });
  return comentario;
};

exports.update = async (data) => {
  const comentario = await Comentario.findByPk(data.id);
  if (!comentario) throw Error(`Comentario com id:${data.id} não existe`);
  const comentarioUpdate = await Comentario.update(data, {
    where: {
      id: data.id
    }
  });
  if (!comentarioUpdate) throw Error('Error ao atualizar o comentario');

  return comentarioUpdate;
};

exports.delete = async (id) => {
  const comentario = await Comentario.destroy({
    where: {
      id
    }
  });

  if (!comentario) throw Error(`Comentario id:${id} não existe.`);
  return comentario;
};

// vai desativar ou ativar os comentario quando um usuario for ativado ou desativador.
exports.updateUserComents = async (userId, isActive) => {
  const coments = await Comentario.findAndCountAll({
    where: {
      user_id: userId
    }
  });

  if (coments.count > 0) {
    const comentario = await Comentario.update(
      { is_active: isActive },
      {
        where: {
          user_id: userId
        },
        returning: true,
        plain: true
      }
    );
    if (!comentario[1]) throw Error('Error ao atualizar o comentario');
  }

  return true;
};
