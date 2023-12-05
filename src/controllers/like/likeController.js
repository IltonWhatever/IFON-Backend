const likeRepository = require('../../repositories/like/likeRepository');

module.exports = {
  /*  async index(req, res) {
    const campis = await campisRepository.listCampus();
    return res.status('200').json(campis);
  } */

  async create(req, res) {
    const { publications_id, user_id } = req.body;
    const data = {
      publications_id,
      user_id
    };

    const like = await likeRepository.create(data);

    return res.status('200').json({ msg: 'Curtiu ;)', like });
  },
  /*
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

  */
  async delete(req, res) {
    const { id } = req.params;

    await likeRepository.delete(id);

    return res.status('200').json('Descurtiu');
  }
};
