const Like = require('../../models/like/like');

/* exports.listCampus = async () => {
  const campus = await Campi.findAll({});
  if (!campus) throw Error('Nenhum campus encontrado');
  return campus;
};

/* exports.listPermisssionTeste = async () => {
  const types = await Permissao.findAll({
    attributes: ['id']
  });

  return types;
};

*/

exports.create = async (data) => {
  const like = await Like.findOrCreate({
    where: { publications_id: data.publications_id, user_id: data.user_id },
    defaults: data,
    returning: true,
    plain: true
  });
  if (like[1] === false) throw Error('Você já curtiu essa publicação');

  return like;
  // const area = await Area.create(data);
};

exports.findLikesInPublication = async (id) => {
  const likes = await Like.findAndCountAll({
    where: { publications_id: id },
    attributes: { exclude: ['publications_id'] },
    raw: true
  });
  return likes;
};

/* exports.find = async (id) => {
  const area = await Permissao.findByPk(id, {
    attributes: ['name']
  });
  return area;
};

exports.update = async (data) => {
  const permissao = await Permissao.update(data, {
    where: {
      id: data.id
    }
  });
  const result = JSON.parse(JSON.stringify(permissao));
  return Object.values(result)[0];
};
*/
exports.delete = async (id) => {
  const like = await Like.findByPk(id);
  if (!like) throw Error('Error ao deletar o like');

  const likeDelete = await Like.destroy({
    where: {
      id
    }
  });
  return likeDelete;
};
