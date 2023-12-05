const faker = require('faker/locale/pt_BR');

const permissionName = ['Web', 'Mobile'];

const permissions = [];

for (let i = 0; i < permissionName.length; i++) {
  const permission = {
    id: faker.datatype.uuid(),
    name: permissionName[i]
  };
  permissions.push(permission);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'permissions',
      permissions,

      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
