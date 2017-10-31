const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	// subTotal: Sequelize.VIRTUAL,
	// get: function () {
	// 	return this.id
	// }
})

module.exports = Order
