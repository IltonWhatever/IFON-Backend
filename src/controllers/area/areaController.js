const areaRepository = require('../../repositories/area/areaRepository');

module.exports = {
  async index(req, res) {
    try {
      const areas = await areaRepository.listAreas();
      return res.status('200').json(areas);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async create(req, res) {
    const { name } = req.body;
    const data = {
      name
    };

    const area = await areaRepository.create(data);

    return res.status('200').json({ msg: 'Cadastrada com sucesso', area });
  },

  async find(req, res) {
    const { id } = req.params;

    const area = await areaRepository.find(id);
    return res.status('200').json(area);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const data = {
      id,
      name
    };
    await areaRepository.update(data);
    return res.status('200').json({
      msg: `Área foi atualizada com sucesso. Nova área ${data.name}.`
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    await areaRepository.delete(id);

    return res.status('200').json('Área deletada com sucesso');
  }
};
