/* eslint-disable no-restricted-syntax */
const publicationRepository = require('../../repositories/publicacao/publicacaoRepository');
const publicationAreaRepository = require('../../repositories/publicacao_area/publicacaoAreaRepository');
const attachmentRepository = require('../../repositories/attachments/attachmentRepository');
const coverRepository = require('../../repositories/capa/capaRepository');
const { logger } = require('../../loaders/logger');

module.exports = {
  async find(req, res) {
    try {
      const { page = 1, limit = 10 } = req.headers;
      const { q = '' } = req.query;

      const searchParams = { page, limit, q };

      const publications = await publicationRepository.find(searchParams);

      return res.status(200).json({
        message: 'Publicações recuperadas com sucesso',
        quantity: publications.quantity,
        content: publications.registers,
      });
    } catch (error) {
      logger.error(`FindPublications ${error.stack}`);
      return res.status(500).json({
        message: error.message || `Ocorreu um erro ao listar as publicações`,
      });
    }
  },

  async create(req, res) {
    try {
      const { title, content, isInternalIfce = false, typeId, areas = [], userId } = req.body;
      const coverFile = req.files.find((item) => item.fieldname === 'cover');
      const attachmentsFiles = req.files.filter((item) => item.fieldname === 'attachments');

      const data = {
        title,
        content,
        isInternalIfce,
        typeId,
        userId,
        cover: coverFile ? coverFile.filename : '',
      };

      const newPublication = await publicationRepository.create({
        ...data,
        is_internal_ifce: isInternalIfce,
        type_id: typeId,
        user_id: userId,
      });

      if (areas && areas.length) {
        const publicationAreas = areas.map((areaId) => ({
          publications_id: newPublication.id,
          area_id: areaId,
        }));

        await publicationAreaRepository.createMany(publicationAreas);
      }

      if (coverFile) {
        await coverRepository.moveFromTempToUploads(coverFile.filename, 'covers');
      }

      if (attachmentsFiles && attachmentsFiles.length) {
        const attachments = attachmentsFiles.map(({ filename }) => ({
          filename,
          publication_id: newPublication.id,
        }));

        await attachmentRepository.createMany(attachments);

        // TODO - melhorar esta operação
        attachments.forEach(async (attachment) => {
          await coverRepository.moveFromTempToUploads(attachment.filename, 'attachments');
        });
      }

      return res.status(200).json({
        message: 'Publicação criada com sucesso',
      });
    } catch (error) {
      logger.error(`CreatePublicationController ${error.stack}`);
      return res.status(500).json({
        message: 'Error interno do servidor. Entre em contato com o suporte',
      });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;

      const loadRelatedData = true;
      const publication = await publicationRepository.findById(id, loadRelatedData);

      return res.status('200').json(publication);
    } catch (error) {
      logger.error(`FindPublicationByIdController ${error.stack}`);
      return res.status(500).json({
        message: 'Error interno do servidor. Entre em contato com o suporte',
      });
    }
  },

  async update(req, res) {
    try {
      const requiredFields = ['title', 'content', 'isInternalIfce', 'typeId'];
      for (const field of requiredFields) {
        if (req.body[field] === null || req.body[field] === undefined) {
          return res.status(400).json({
            message: `O campo ${field} é obrigatório`,
          });
        }
      }

      const { id } = req.params;
      const { title, content, isInternalIfce, typeId, areas = [] } = req.body;

      const publicationDataModelDTO = {
        title,
        content,
        is_internal_ifce: isInternalIfce,
        type_id: typeId,
      };

      await publicationRepository.update(id, publicationDataModelDTO);
      await publicationAreaRepository.delete(id);

      if (areas && areas.length) {
        const publicationAreas = areas.map((areaId) => ({
          publications_id: id,
          area_id: areaId,
        }));

        await publicationAreaRepository.createMany(publicationAreas);
      }

      return res.status('200').json({
        message: `Publicação atualizada com sucesso`,
      });
    } catch (error) {
      logger.error(`updatePublicationController ${error.stack}`);
      return res.status(500).json({
        message: `Erro interno no servidor`,
      });
    }
  },

  async activate(req, res) {
    try {
      const { id } = req.params;

      await publicationRepository.activate(id);

      return res.status(200).json({
        message: `Publicação ativada`,
      });
    } catch (error) {
      logger.error(`ActivatePublicationController ${error.stack}`);
      return res.status(500).json({
        message: `Ocorreu um erro ao ativar a publicação`,
      });
    }
  },

  async deactivate(req, res) {
    try {
      const { id } = req.params;

      await publicationRepository.deactivate(id);

      return res.status(200).json({
        message: `Publicação desativada`,
      });
    } catch (error) {
      logger.error(`DeactivatePublicationController ${error.stack}`);
      return res.status(500).json({
        message: `Ocorreu um erro ao desativar a publicação`,
      });
    }
  },

  async updateCover(req, res) {
    try {
      const { publicationId } = req.body;
      const coverFile = req.files.find((item) => item.fieldname === 'cover');
      if (!publicationId) throw new Error('O ID da publicação é obrigatório');
      if (!coverFile) throw new Error('Arquivo não encontrado');

      const publication = await publicationRepository.findById(publicationId);
      if (!publication) throw new Error('Publicação não encontrada');

      await coverRepository.delete(publication.cover);
      await coverRepository.moveFromTempToUploads(coverFile.filename, 'covers');

      await publicationRepository.update(publicationId, { cover: coverFile.filename });

      return res.status(200).json({
        message: 'Capa atualizada com sucesso',
      });
    } catch (error) {
      logger.error(`UpdatePublicationCover ${error.stack}`);
      return res.status(500).json({
        message: `Ocorreu um erro ao atualizar a capa`,
      });
    }
  },

  async deleteCover(req, res) {
    try {
      const { id: publicationId } = req.params;
      if (!publicationId) throw new Error('O ID da publicação é obrigatório');

      const publication = await publicationRepository.findById(publicationId);
      if (!publication) throw new Error('Publicação não encontrada');
      if (!publication.cover)
        return res.status(200).json({
          message: 'Essa publicação não possui capa',
        });

      await coverRepository.delete(publication.cover);

      await publicationRepository.update(publicationId, { cover: '' });

      return res.status(200).json({
        message: 'Capa removida com sucesso',
      });
    } catch (error) {
      logger.error(`DeletePublicationCover ${error.stack}`);
      return res.status(500).json({
        message: `Ocorreu um erro ao remover a capa`,
      });
    }
  },
};
