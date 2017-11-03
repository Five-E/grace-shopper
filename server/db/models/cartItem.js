var Sequelize = require('sequelize')
var db = require('../db')

const item = require('./item')
const user = require('./user')

var CartItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    defaultScope: {
        include: [ item, user ]
    }
})

module.exports = CartItem
