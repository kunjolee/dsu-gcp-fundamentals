const express = require('express');
const cors = require('cors')

const { usersRoute } = require('../routes/');

class Server {

    constructor() {
        this.app = express();
        this.port = 9000
        this.paths = {
            user: '/api/user'
        }

        this.middlewares()
        this.routes()
    }

    routes() { 
        this.app.use(this.paths.user, usersRoute) 
    }

    middlewares () {
        this.app.use(cors())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`)
        })
    }

}


module.exports = Server

