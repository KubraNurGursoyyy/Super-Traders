'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('wallets', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'wallet_fkey_constraint_user',
      references: { //Required field
        table: 'users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
