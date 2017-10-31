const Sequelize = require('sequelize'); 
const db = require('../db'); 

module.exports = db.define('reviews', {
    rating: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    } 
}); 