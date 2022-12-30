const cors = require('cors');
const express = require('express');
const app = express();

const db = require('../db/connection');

const { 
    usersRoute,
} = require('../routes');

const paths = {
    user: '/api/user'
}

const database = async () => {
    try {
        db.authenticate();
        console.log('Database online');
    } catch (error) {
        console.log('Unable to connect to the database: ', error);
        throw new Error('Something went wrong while connecting to DB');
    }   
}

const middlewares = async () => {
    
    app.use( express.json() );
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    })
    app.use( express.static('public') );
}

const routes = async () =>  { 
    app.use(paths.user, usersRoute); 
}

module.exports = {
    database,
    middlewares,
    routes,
    app
}