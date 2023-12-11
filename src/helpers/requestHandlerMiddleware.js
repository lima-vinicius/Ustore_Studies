const requestHandlerMiddleware = (req, res) => {
    const body = {}

    if (res.locals.count){
        body.count = res.locals.count
    } 
    if (res.locals.data){
        body.data = res.locals.data
    } 
    if (res.locals.message){
        body.message = res.locals.message
    }

    res.status(res.locals.status || 200).json(body);
}

module.exports = requestHandlerMiddleware
