const capaRepository = require('../../repositories/capa/capaRepository');

module.exports = {
  async create(req, res) {
    const { publications_id } = req.body;

    const { file } = req;

    const capa = {
      file: file.path,
      name: file.originalname,
      size: file.size,
      key: file.filename,
      url: '',
      publications_id
    };

    const newCapa = await capaRepository.create(capa);

    if (!newCapa)
      throw Error(
        `Erro: Publicação com o id: ${publications_id} já possui uma capa.`
      );

    return res.status('200').json('Capa criada com sucesso.');
  },

  async find(req, res) {
    const { id } = req.params;

    const capa = await capaRepository.find(id);

    return res.status('200').json(capa);
  },

  async delete(req, res) {
    const { id } = req.params;
    // deletando os arquivos da publicação
    await capaRepository.delete(id);

    return res.status('200').json('Capa deletada com sucesso');
  }
};
