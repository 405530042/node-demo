const Sequelize = require('sequelize');
const db = require('./_db.js');
const User = db.define('User', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    nickname: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.INTEGER
    }
})
module.exports = User;