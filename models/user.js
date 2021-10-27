const Sequelize = require('sequelize');
const db = require('../db.js');


const User = db.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
    },
    salt : {
        type: Sequelize.DataTypes.STRING,
    }
});


module.exports = User;