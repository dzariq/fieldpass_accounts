const validateParams = (params) => {
    return (req, res, next) => {
        const missingParams = params.filter(param => !(param in req.query || param in req.body));
        if (missingParams.length > 0) {
            return res.status(400).json({ error: `Missing parameters: ${missingParams.join(', ')}` });
        }
        next();
    };
};

module.exports = validateParams