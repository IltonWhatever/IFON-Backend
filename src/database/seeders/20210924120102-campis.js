const faker = require('faker/locale/pt_BR');

const campiName = [
  'IFCE CAMPUS-Cedro',
  'IFCE CAMPUS-Iguatu',
  'IFCE CAMPUS-Jaguaribe',
  'IFCE CAMPUS-Maracanaú',
  'IFCE CAMPUS-Canindé',
  'IFCE CAMPUS-Morada Nova',
  'IFCE CAMPUS-Paracuru',
  'IFCE CAMPUS-Pecém',
  'IFCE CAMPUS- Quixadá',
  'IFCE CAMPUS-Sobral',
  'IFCE CAMPUS-Tabuleiro do Norte'
];

const campis = [];

for (let i = 0; i < campiName.length; i++) {
  const campos = {
    id: faker.datatype.uuid(),
    name: campiName[i],
    adress: `${faker.address.streetSuffix()} ${faker.name.findName()}  ${faker.datatype.number(
      500
    )}`
  };
  campis.push(campos);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('campi', campis, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('campi', null, {});
  }
};
