const dotenv = require('dotenv');

dotenv.config();

const DB_NAME =     process.env.DB_NAME;
const DB_USER =     process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST =     process.env.DB_HOST;
const DB_PORT =     process.env.DB_PORT;

const APP_PORT = process.env.APP_PORT;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;



module.exports = {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    APP_PORT,
    JWT_PRIVATE_KEY,
    GOOGLE_APPLICATION_CREDENTIALS
}