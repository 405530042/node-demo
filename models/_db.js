
// _db.js
const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL;

// _db.js
const db = new Sequelize(url, {
 dialect: 'postgres',
 dialectOptions: {
 ssl: true,
 },
 pool: {
 max: 5,
 min: 0,
 acquire: 30000,
 idle: 10000
 },
});
module.exports = db;