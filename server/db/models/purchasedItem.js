const Sequelize = require('sequelize');
const db = require('../db');

const PurchasedItem = module.exports = db.define('purchasedItem', {
    purchasePrice: {
        type: Sequelize.FLOAT(10, 2), 
        allowNull: false, 
        validate: {
            min: 0
        }
    }
}); 

module.exports = PurchasedItem; 