var Sequelize = require('sequelize');
var db = require('../db'); 

var CartItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

module.exports = CartItem;
