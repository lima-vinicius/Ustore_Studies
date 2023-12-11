const errorMiddleware = (err, req, res, next) => {
    const { message, status } = err

    res.locals = {
        ...res.locals,
        message: message || 'This service is not available. Please try again soon.',
        status: status || 500,
    }
    next()
}

module.exports = errorMiddleware
