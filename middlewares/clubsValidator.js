function validateCreateClub(req, res, next) {
    const { clubName } = req.body;

    if (!clubName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    next();
}

module.exports = validateCreateClub;