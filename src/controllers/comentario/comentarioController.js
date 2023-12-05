const comentarioRepository = require('../../repositories/comentarios/comentarioRepository');

module.exports = {
  async index(req, res) {
    try {
      const comentarios = await comentarioRepository.listComentarios();
      return res.status('200').json(comentarios);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async create(req, res) {
    const { content, publications_id, user_id } = req.body;
    const data = {
      content,
      publications_id,
      user_id
    };

    const comentario = await comentarioRepository.create(data);

    return res.status('200').json(comentario);
  },

  async find(req, res) {
    const { id } = req.params;

    const comentario = await comentarioRepository.find(id);
    return res.status('200').json(comentario);
  },

  async update(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    const data = {
      id,
      content
    };
    await comentarioRepository.update(data);
    return res.status('200').json({
      msg: `Comentario foi atualizada com sucesso. Novo comentario '${data.content}'.`
    });
  },

  async delete(req, res) {
    const { id } = req.params;

    await comentarioRepository.delete(id);

    return res.status('200').json('Comentario deletada com sucesso');
  }
};
