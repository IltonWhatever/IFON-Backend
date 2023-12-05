const Campi = require('../../models/campi/campi');

exports.listCampus = async () => {
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

exports.create = async (data) => {
  const area = await Permissao.findOrCreate({ where: { name: data.name } });
  const result = JSON.parse(JSON.stringify(area));
  return Object.values(result)[1];
  // const area = await Area.create(data);
};

exports.find = async (id) => {
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

exports.delete = async (id) => {
  const permissao = await Permissao.destroy({
    where: {
      id
    }
  });
  return permissao;
};
 */
