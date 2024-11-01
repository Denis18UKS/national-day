const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Функция для логирования
const logToFile = (message) => {
    const logPath = path.join(__dirname, '..', 'logs', 'log.txt');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logPath, logMessage, (err) => {
        if (err) console.error('Ошибка при записи в лог:', err);
    });
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Проверка на существование пользователя
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        logToFile(`User registered: ${username}`);
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        logToFile(`Registration error for ${req.body.username}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            logToFile(`Failed login attempt for ${username}`);
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        logToFile(`User logged in: ${username}`);

        // Возвращаем ID пользователя вместе с токеном
        res.json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
        logToFile(`Login error for ${req.body.username}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

