const faker = require('faker/locale/pt_BR');

const areaName = [
  'Fisica',
  'Português',
  'Matemática',
  'História',
  'Geografia',
  'Química',
  'Inglês'
];

const areas = [];

for (let i = 0; i < areaName.length; i++) {
  const area = {
    id: faker.datatype.uuid(),
    name: areaName[i],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  areas.push(area);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('areas', areas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
