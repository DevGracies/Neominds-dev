export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // Log error for the developer
    console.error('ERROR 💥:', err);
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
//# sourceMappingURL=error.middleware.js.map