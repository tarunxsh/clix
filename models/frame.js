const Sequelize = require('sequelize');
const db = require('../db.js');


const Frame = db.define('frame', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    src : {
        type : Sequelize.DataTypes.STRING
    },
    descp: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    likes : {
        type : Sequelize.DataTypes.INTEGER
    },
    downloads : {
        type : Sequelize.DataTypes.INTEGER
    }
    
});


module.exports = Frame;

/*
frame Model
    Id
    image file
    descp
    like count
    export count
*/    