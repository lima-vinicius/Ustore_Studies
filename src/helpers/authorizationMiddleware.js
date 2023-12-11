const jwtoken = require('jsonwebtoken')

const { permissionChecker } = require('../utils')

module.exports = (rulePermission) => (req, res, next) => {
    try {
        const { authorization } = req.headers

    if(!authorization) {
        next({
            status: 401,
            message: 'No token provided'
        })
    }

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
        next({
            status: 400,
            message: 'Invalid token formart'
        })
    }

    const [scheme, token] = parts
    
    if (!/^Bearer$/i.test(scheme)) {
        next({
            status: 400,
            message: 'Invalid token scheme. Please use the Bearer scheme'
        })
    }

    jwtoken.verify(token, process.env.JWTSECRET, async (error, decoded) => {
        if (error.message === 'jwt malformed') {
            next({
                status: 400,
                message: 'Invalid token formart'
            })
        }

        if (error) {
            next({
                status: 400,
                message: 'Your session has expired. Please log in again'
            })
        }

        const userPermission = decoded ? await permissionChecker(rulePermission, decoded.id) : null

        if(!userPermission) {
            next({
                status: 401,
                message: 'Access denided'
            })
        }

        if (decoded && decoded.id) {
            req.user_id = decoded.id;
        }
    
        next()
    })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}