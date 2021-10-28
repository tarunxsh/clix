const Sequelize = require('sequelize');
const db = require('../db');
const Frame = require('./frame');

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


User.hasMany(Frame);
Frame.belongsTo(User);

module.exports = User;