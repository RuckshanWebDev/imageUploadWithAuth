const notFound = (req, res, next) => {

    const error = new Error(`Not Fount - ${req.originalUrl}`)
    res.status(404)

    next(error)

}

const errorHandler = (err, req, res, next) => {

    let status = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    if (err.message === 'CastError' && err.kind === 'ObjectId') {
        status = 404
        message = 'Resourece not found'

    }

    res.status(status).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

    next()

}

export { notFound, errorHandler }