const campisRepository = require('../../repositories/campi/campiRepository');

module.exports = {
  async index(req, res) {
    const campis = await campisRepository.listCampus();
    return res.status('200').json(campis);
  }

  /* async create(req, res) {
    const { name } = req.body;
    const data = {
      name
    };

    const type = await typeRepository.create(data);

    return res.status('200').json({ msg: 'Cadastrada com sucesso', type });
  },

  async find(req, res) {
    const { id } = req.params;
    const type = await typeRepository.find(id);
    return res.status('200').json(type);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const data = {
      id,
      name
    };
    await typeRepository.update(data);
    return res.status('200').json({
      msg: `Tipo de publicação foi atualizada com sucesso. Novo tipo ${data.name}.`
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    await typeRepository.delete(id);

    return res.status('200').json('Tipo de publicação deletado com sucesso');
  } */
};
