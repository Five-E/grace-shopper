const Sequelize = require('sequelize'); 
const db = require('../db'); 

const Review = module.exports = db.define('review', {
    rating: {
        type: Sequelize.FLOAT(1, 1), 
        allowNull: false, 
        defaultValue: 5, 
        validate: {
            min: 0, 
            max: 5
        }
    }, 
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    } 
});

module.exports = Review; 