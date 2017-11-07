var Sequelize = require('sequelize')
var db = require('../db')

var Status = db.define('status', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: false
    }
});

module.exports = Status
