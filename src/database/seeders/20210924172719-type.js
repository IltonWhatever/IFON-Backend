const faker = require('faker/locale/pt_BR');

const typeName = ['Curso', 'Palestra', 'Edital'];

const types = [];

for (let i = 0; i < typeName.length; i++) {
  const type = {
    id: faker.datatype.uuid(),
    name: typeName[i]
  };
  types.push(type);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('type', types, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type', null, {});
  }
};
