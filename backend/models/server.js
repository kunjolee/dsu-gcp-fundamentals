const express = require('express');
const cors = require('cors');

const db = require('../db/connection');
const { APP_PORT } = require('../conf/environment');
const { 
    usersRoute,
    authRoute, 
    albumsRoute, 
    photosRoute,
} = require('../routes/');

class Server {

    constructor() {
        this.app = express();
        this.port = APP_PORT
        this.paths = {
            album:       '/api/album',
            auth:        '/api/auth',
            photo:       '/api/photo',
            user:        '/api/user',
        }

        this.database();
        this.middlewares();
        this.routes();
    }

    async database () {
        try {
            db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.log('Unable to connect to the database: ', error);
            throw new Error('Something went wrong while connecting to DB');
        }   
    }

    middlewares () {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() { 
        this.app.use(this.paths.album, albumsRoute); 
        this.app.use(this.paths.photo, photosRoute); 
        this.app.use(this.paths.auth, authRoute); 
        this.app.use(this.paths.user, usersRoute); 
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        })
    }

}


module.exports = Server

