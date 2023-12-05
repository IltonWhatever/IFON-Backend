const Type = require('../../models/type/type');

exports.listTypes = async () => {
  const types = await Type.findAll({
    order: [['name', 'ASC']],
    attributes: ['id', 'name']
  });

  return types;
};

exports.create = async (data) => {
  const type = await Type.findOrCreate({ where: { name: data.name } });
  if (type[1] === false) throw Error('Tipo de publicação já existe');

  return type;
};

exports.find = async (id) => {
  const type = await Type.findByPk(id, {
    attributes: ['id', 'name']
  });

  if (!type) throw Error(`tipo com o id ${id} não existe`);
  return type;
};

exports.update = async (data) => {
  const type = await Type.findByPk(data.id);
  if (!type)
    throw Error(`Error: o tipo de publicção com id: ${data.id} não existe;`);
  const typeNameExist = await Type.findOne({ where: { name: data.name } });
  if (typeNameExist)
    throw Error('Error: o tipo de publicação com esse nome já existe;');

  const typeUpdate = await Type.update(data, {
    where: {
      id: type.id
    }
  });
  if (!typeUpdate) throw Error('Error ao atualizar a área');

  return typeUpdate;
};

exports.delete = async (id) => {
  const type = await Type.destroy({
    where: {
      id
    }
  });

  if (!type) throw Error(`Error ao deletar o tipo com o id ${id}`);
  return type;
};
