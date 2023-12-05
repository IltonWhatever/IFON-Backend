/* eslint-disable no-param-reassign */
const Publication = require('../../models/publicacao/publicacao');
const User = require('../../models/user/user');
const Attachments = require('../../models/file/file');

const { APP_PORT } = process.env;
const { APP_HOST } = process.env;

exports.find = async (paginate) => {
  const { offset, limit } = paginate;

  const publications = await Publication.findAndCountAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: Attachments, as: 'attachments', attributes: ['filename', 'created_at'] },
    ],
    distinct: true,
    attributes: { exclude: ['user_id', 'type_id'] },
    offset,
    limit,
  });

  const publicationsWithCoverPath = publications.rows
    .map((publication) => {
      const rawPublication = publication.toJSON();
      if (rawPublication.cover) {
        return {
          ...rawPublication,
          cover: `http://${APP_HOST}:${APP_PORT}/covers/${rawPublication.cover}`,
        };
      }
      return rawPublication;
    })
    .map((publication) => {
      if (publication.attachments && publication.attachments.length) {
        publication.attachments.forEach((att) => {
          if (att.filename) {
            att.filename = `http://${APP_HOST}:${APP_PORT}/attachments/${att.filename}`;
          }
        });
      }
      return publication;
    });

  return {
    registers: publicationsWithCoverPath,
    quantity: publications.count,
  };
};

exports.create = async (data) => {
  const publication = await Publication.create({
    ...data,
  });

  return publication;
};

exports.update = async (id, newData) => {
  await Publication.update(newData, { where: { id } });
  return true;
};

// vai desativar ou ativar uma publication quando um usuario for ativado ou desativador.
exports.updateUserPublication = async (userId, status) => {
  const publications = await Publication.findAndCountAll({
    where: {
      user_id: userId,
    },
  });

  if (publications.count > 0) {
    const publicacao = await Publication.update(
      { status },
      {
        where: {
          user_id: userId,
        },
        returning: true,
        plain: true,
      }
    );
    if (!publicacao[1]) throw Error('Error ao atualizar a publicação');
  }

  return true;
};

exports.activate = async (id) => {
  await Publication.update({ is_active: true }, { where: { id } });
};

exports.deactivate = async (id) => {
  await Publication.update({ is_active: false }, { where: { id } });
};
