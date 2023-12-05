const Area = require('../../models/area/area');

exports.listAreas = async () => {
  const areas = await Area.findAll({
    attributes: ['id', 'name']
  });

  return areas;
};

exports.create = async (data) => {
  const area = await Area.findOrCreate({ where: { name: data.name } });
  if (area[1] === false) throw Error('Área já existe');

  return area;
};

exports.find = async (id) => {
  const area = await Area.findByPk(id, {
    attributes: ['id', 'name']
  });

  if (!area) throw Error('Área não existe');
  return area;
};

exports.update = async (data) => {
  const areaNameExist = await Area.findOne({ where: { name: data.name } });
  if (areaNameExist) throw Error('Error: a área com esse nome já existe;');

  const area = await Area.findByPk(data.id);
  if (!area) throw Error('Error: a área com esse id não existe;');
  const areaUpdate = await Area.update(data, {
    where: {
      id: area.id
    }
  });
  if (!areaUpdate) throw Error('Error ao atualizar a área');

  return areaUpdate;
};

exports.delete = async (id) => {
  const area = await Area.destroy({
    where: {
      id
    }
  });

  if (!area) throw Error('Error: Área id não existe.');
  return area;
};
