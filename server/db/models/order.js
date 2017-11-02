const Sequelize = require('sequelize')
const db = require('../db')

const user = require('./user')
const purchasedItem = require('./purchasedItem')
const status = require('./status')

const Order = db.define('order', {
	totalPrice: {
		type: Sequelize.VIRTUAL,
		get: function () {
			return this.purchasedItems.reduce((total, item) => {
				let itemTotal = (item.purchasePrice * item.purchaseQuantity)
				// need to round due to .00002
				itemTotal = Math.round(itemTotal * 100) / 100
				return total + itemTotal
			}, 0)
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
