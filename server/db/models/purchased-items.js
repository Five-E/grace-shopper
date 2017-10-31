const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('purchasedItem', {
    purchasePrice: {
        type: Sequelize.FLOAT, 
        allowNull: false
    }
})