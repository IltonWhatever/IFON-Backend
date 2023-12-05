const permissaoRepository = require('../../repositories/permissao/permissaoRepository');

module.exports = {
  async index(req, res) {
    try {
      const permissao = await permissaoRepository.listpermissoes();
      return res.status('200').json(permissao);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async create(req, res) {
    const { name } = req.body;
    const data = {
      name
    };
    try {
      const permissao = await permissaoRepository.create(data);
      if (permissao === false) {
        return res.status('400').json('Permissão já existe');
      }
      return res.status('200').json('Permissão cadrastada com sucesso');
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async find(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoRepository.find(id);
      if (!permissao) return res.status('401').json('Permissão não existe');
      return res.status('200').json(permissao);
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const data = {
      id,
      name
    };
    try {
      const permissao = await permissaoRepository.update(data);
      if (permissao === 0) {
        return res.status('401').json('Não foi possivel atualizar a permissão');
      }
      return res
        .status('200')
        .json({ msg: `Permissão foi atualizada com sucesso` });
    } catch (error) {
      return res.status('500').json(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoRepository.delete(id);
      if (!permissao) {
        return res.status('401').json('Permissão não existe');
      }
      return res.status('200').json('Permissão deletada com sucesso');
    } catch (error) {
      return res.status('500').json(error);
    }
  }
};
