const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
		defaultValue: '/images/defaultCategory.jpg'
	}
}, {
	scopes: {
		include: [{all: true, nested: true}]
	}
})

module.exports = Category
