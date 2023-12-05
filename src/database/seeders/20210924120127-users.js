const faker = require('faker/locale/pt_BR');

const Password = require('../../services/password');

const users = [];

for (let i = 0; i < 10; i++) {
  const user = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    is_active: true,
    is_ifce: true,
    telephone: faker.phone.phoneNumber('88 999##-####'),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  users.push(user);
}
module.exports = {
  up: async (queryInterface) => {
    const campis = await queryInterface.sequelize.query(
      'SELECT id from campi;'
    );

    const permission = await queryInterface.sequelize.query(
      'SELECT id from permissions;'
    );
    const senha = await Password.createhash('12345678');
    const campisRows = campis[0];
    const permissionRows = permission[0];
    users.map((user) => {
      user.campus_id = campisRows[0].id;
      user.permissions_id = permissionRows[0].id;
      user.password = senha;
    });

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
