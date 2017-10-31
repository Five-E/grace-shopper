const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	picture: {
		type: Sequelize.STRING,
		defaultValue: '/images/defaultItem.jpg'
	},
	price: {
		type: Sequelize.FLOAT(10, 2),
		allowNull: false,
		validate: {
			min: 0
		}
	},
	stock: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	description: {
		type: Sequelize.TEXT,
		defaultValue: 'one hot rock'
	}
})

module.exports = Item
