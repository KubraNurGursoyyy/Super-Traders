'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //wallet
    queryInterface.addConstraint('users', {
      fields: ['walletID'],
      type: 'foreign key',
      name: 'user_fkey_constraint_wallet',
      references: { //Required field
        table: 'wallets',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
