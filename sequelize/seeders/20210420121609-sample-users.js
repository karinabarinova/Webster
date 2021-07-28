'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
	 return await queryInterface.bulkInsert(
		 "Users", 
		 [
			{
				fullName: "Karina Barinova",
				email: "karinabarinova11@gmail.com",
				password: bcrypt.hashSync('hello', 8),
				email_validated: true,
				hasCompany: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				fullName: "Anna Hannelson",
				email: "anna@ann.com",
				password: bcrypt.hashSync('hello', 8),
				email_validated: true,
				hasCompany: true,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		 ]
	 )
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return await queryInterface.bulkDelete("Users", null, {});
	}
};
