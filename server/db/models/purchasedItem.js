const Sequelize = require('sequelize')
const db = require('../db')

const item = db.model('item')

const PurchasedItem = module.exports = db.define('purchasedItem', {
    purchasePrice: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    purchaseQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    defaultScope: {
        include: [ item ]
    }
})

module.exports = PurchasedItem
