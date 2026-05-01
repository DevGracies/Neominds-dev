import { ZodError } from 'zod';
export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.errors.map(e => ({ path: e.path, message: e.message }))
            });
        }
        next(error);
    }
};
//# sourceMappingURL=validate.middleware.js.map