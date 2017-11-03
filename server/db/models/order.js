const Sequelize = require('sequelize')
const db = require('../db')

const user = require('./user')
const purchasedItem = require('./purchasedItem')
const status = require('./status')

const Order = db.define('order', {
	totalPrice: {
		type: Sequelize.VIRTUAL,
		get: function () {
			let total = this.purchasedItems.reduce((total, item) => {
				let itemTotal = (item.purchasePrice * item.purchaseQuantity)
				return Math.round((total + itemTotal)*100) / 100
			}, 0)
			// this returns a string that always has two decimal places
			return '$'+ parseFloat(total).toFixed(2)
		}
	},
	itemQuantity: {
		type: Sequelize.VIRTUAL,
		get: function () {
			return this.purchasedItems.reduce((total, item) => {
				return total + item.purchaseQuantity
			}, 0)
		}
	}
}, {
	defaultScope: {
		include: [ user, status, purchasedItem ]
	}
})

module.exports = Order
