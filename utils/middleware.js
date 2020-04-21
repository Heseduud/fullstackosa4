const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: 'Bad request' })
    }

    next(error)
}

module.exports = { unknownEndpoint, errorHandler }