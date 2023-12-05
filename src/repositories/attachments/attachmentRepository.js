const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const File = require('../../models/file/file');

const s3 = new aws.S3();
exports.listFiless = async () => {
  const files = await File.findAll({});

  return files;
};

exports.createMany = async (attachmentsData = []) => {
  await File.bulkCreate(attachmentsData);
  return true;
};

exports.delete = async (id) => {
  const keyFile = await File.findOne({
    where: { id },
    attributes: ['key'],
    raw: true,
  });

  if (!keyFile) throw Error(`Error: Arquivo com  id = ${id} não existe.`);

  const { key } = keyFile;
  if (process.env.STORAGE_TYPE === 's3') {
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      key,
    });
  }

  if (process.env.STORAGE_TYPE === 'local') {
    promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', key));
  }

  const file = await File.destroy({
    where: {
      id,
    },
  });
  if (!file) throw Error(`Error: File id = ${id} não existe.`);
  return file;
};

exports.findAll = async (id) => {
  const file = await File.findAndCountAll({
    where: { publications_id: id },
    attributes: ['url'],
    raw: true,
  });

  if (!file) throw Error('Arquivo não existe');
  return file;
};
/*
  if (fileExist) throw Error('Error: um arquivo com esse nome já existe;');

  const file = await File.findByPk(data.id);
  if (!file) throw Error('Error: arquivo com esse id não existe;');
  const fileUpdate = await File.update(data, {
    where: {
      id: file.id
    }
  });
  if (!fileUpdate) throw Error('Error ao atualizar o arquivo');

  return fileUpdate;
};
*/
