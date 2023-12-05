const PublicationArea = require('../../models/publicacao_area/publicacaoArea');

exports.create = async (data) => {
  const publicationArea = await PublicationArea.create(data);
  if (!publicationArea) throw Error('Publicação Area já existe');

  return publicationArea;
};

exports.createMany = async (data = []) => {
  await PublicationArea.bulkCreate(data);
  return true;
};

exports.delete = async (publicationId) => {
  await PublicationArea.destroy({
    where: {
      publications_id: publicationId,
    },
  });
};
