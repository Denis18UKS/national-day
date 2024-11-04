const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Декодированный токен с id и role пользователя
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
