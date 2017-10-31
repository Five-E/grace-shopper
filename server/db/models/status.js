var Sequelize = require('sequelize');
var db = require('../db'); 

var Status = db.define('status', {
    type: {
        type: Sequelize.CHAR,
        defaultValue: 'Preparing',
        allowNull: false
    }
});

module.exports = Status;