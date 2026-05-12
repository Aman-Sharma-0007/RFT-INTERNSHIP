class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {

    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid task ID format' });
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(e => e.message).join(', ');
        return res.status(400).json({ success: false, error: message });
    }
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};

module.exports = { AppError, errorHandler };