const Sequelize = require('sequelize');
const Item = require('./item')
const User = require('./user')
const db = require('../db');

const Review = module.exports = db.define('review', {
    rating: {
        type: Sequelize.FLOAT(1, 1),  // eslint-disable-line new-cap
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
},
{
  defaultScope: {
    include: [Item, User]
  }
});

module.exports = Review;
