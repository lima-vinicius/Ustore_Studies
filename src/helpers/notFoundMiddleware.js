const notFoundMiddleware = (req, res, next) => {
    if (!(res.locals.status || res.locals.data || res.locals.message)) {
        next({
            status: 404,
            message: 'Invalid URL'
        })
        
    } else {
        next()
    }
}

module.exports = notFoundMiddleware
