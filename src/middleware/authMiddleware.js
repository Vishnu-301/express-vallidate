// middleware error handler
const handleErrors = (err, req, res, next) => {
    console.error('error executing query', err.stack);
    res.status(500)
        .json({
            status: 500,
            message: 'An unexpected error occurred',
            error: err.message
        });
    next();
}

export default handleErrors;