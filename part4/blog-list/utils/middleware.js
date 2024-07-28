const errorHandler = (error, request, response, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).send('Username is already taken');
    }
    next(error);
}

module.exports = errorHandler