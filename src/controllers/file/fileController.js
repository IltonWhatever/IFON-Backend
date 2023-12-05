const fileRepository = require('../../repositories/attachments/attachmentRepository');

module.exports = {
  async create(req, res) {
    const { publications_id } = req.body;
    const { file } = req;
    const newFile = {
      file: file.path,
      name: file.originalname,
      size: file.size,
      key: file.filename,
      url: '',
      publications_id,
    };

    await fileRepository.create(newFile);

    return res.status('200').json(`Anexos adicionados com sucesso `);
  },

  async findAll(req, res) {
    const { id } = req.params;
    // deletando os arquivos da publicação
    const files = await fileRepository.findAll(id);

    if (!files) return res.status('404').json('Nenhum arquivos da publicação encontrado');
    return res.status('200').json({ msg: 'Arquivos da publicação', files });
  },

  async delete(req, res) {
    const { id } = req.params;
    // deletando os arquivos da publicação
    await fileRepository.delete(id);

    return res.status('200').json('Arquivo deletado com sucesso');
  },
};
