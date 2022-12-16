const dotenv = require('dotenv');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.HOST;

module.exports = {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    HOST
}