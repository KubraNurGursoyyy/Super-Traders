'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('portfolios', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'portfolio_fkey_constraint_user',
      references: { //Required field
        table: 'users',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    queryInterface.addConstraint('portfolios', {
      fields: ['shareID'],
      type: 'foreign key',
      name: 'portfolio_fkey_constraint_share',
      references: { //Required field
        table: 'shares',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
