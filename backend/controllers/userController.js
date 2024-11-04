const User = require('../models/User');

exports.getUserRole = async (req, res) => {
    try {
        const { role } = req.user; // Извлекаем роль из декодированного токена
        res.json({ role });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при загрузке роли пользователя' });
    }
};
