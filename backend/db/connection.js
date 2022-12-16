const { Sequelize } = require('sequelize');

const { DB_NAME, DB_PASSWORD, DB_USER, HOST } = require('../conf/environment');

const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASSWORD);

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:5432/${DB_NAME}`;


const db = new Sequelize( URI, {
    dialect: 'postgres'
});

db.sync();

module.exports = db

