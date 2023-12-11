require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = (params) => jwt.sign(params, process.env.JWTSECRET, {
    expiresIn: 86400,
})
