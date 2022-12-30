const { Sequelize } = require('sequelize');

const { DB_NAME, DB_PASSWORD, DB_USER, DB_HOST, DB_PORT } = require('../conf/environment');
const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASSWORD);

const URI = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;


const db = new Sequelize( URI, {
    dialect: 'postgres'
});

// db.sync();

module.exports = db

