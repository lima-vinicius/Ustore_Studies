const express = require('express')
require('dotenv').config()
require('./database/connection.js')

const routes = require('./routes')

class Application {
    constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(routes.userRoutes)
        this.express.use(routes.loginRoutes)
    }
}

module.exports = new Application().express
