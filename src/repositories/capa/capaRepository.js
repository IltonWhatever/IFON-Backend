const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Capa = require('../../models/capa/capa');

exports.create = async (publicationId, data) => {
  const { filename, filePath, name, size } = data;

  await Capa.create({
    key: filename,
    name,
    size,
    url: '',
    file: filePath,
    publications_id: publicationId,
  });
};

exports.moveFromTempToUploads = async (fileName, subpath = '') => {
  return new Promise((resolve, reject) => {
    const oldPath = path.resolve(__dirname, '..', '..', '..', 'public', 'temp', fileName);
    const newPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'uploads',
      subpath,
      fileName
    );

    fs.rename(oldPath, newPath, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
};

exports.createDeprecated = async (capa) => {
  const capaExist = await Capa.findOne({
    where: {
      publications_id: capa.publications_id,
    },
    raw: true,
  });

  if (capaExist) {
    // apagando a img no repositorio temporario
    promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'public', 'temp', capa.key));

    return false;
  }
  const newCapa = await Capa.create(capa);
  if (newCapa) {
    // movendo a img do repositorio temporario para o repositorio uploads
    fs.rename(
      path.resolve(__dirname, '..', '..', '..', 'public', 'temp', capa.key),
      path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', capa.key),
      function (err) {
        if (err) throw err;
        console.log('Sucesso arquivo movido para pasta uploads');
      }
    );
    return true;
  }

  throw Error('Erro ao criar a capa.');
};

exports.find = async (id) => {
  const capa = await Capa.findOne({
    where: { publications_id: id },
    attributes: ['id', 'url', 'publications_id'],
    raw: true,
  });

  if (!capa) throw Error('Capa não existe');
  return capa;
};

exports.delete = async (filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'uploads',
      'covers',
      filename
    );
    fs.unlink(filePath, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

  /* if (!keyFile) throw Error(`Error: Capa da publicação com  id = ${id} não existe.`);
  const { key } = keyFile;
  promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'public', 'uploads', key));

  const capa = await Capa.destroy({
    where: {
      publications_id: id,
    },
  });
  if (!capa) throw Error(`Error: Erro ao deletar a capa da publicação com  id = ${id}.`);
  return capa; */
};

/*
exports.update = async (data) => {
  const fileExist = await File.findOne({ where: { file: data.file } });
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
