const News = require('../models/News');
const fs = require('fs');
const path = require('path');

// Функция для логирования
const logToFile = (message) => {
    const logPath = path.join(__dirname, '..', 'logs', 'logNews.txt');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logPath, logMessage, (err) => {
        if (err) console.error('Ошибка при записи в лог:', err);
    });
};

exports.createNews = async (req, res) => {
    console.log('Received request to create news:', req.body);
    logToFile(`Received request to create news: ${JSON.stringify(req.body)}`);

    try {
        const { title, content, author_id } = req.body; // Получаем author_id из тела запроса

        if (!title || !content || !author_id) {
            logToFile(`Creation failed: Title, content or author_id is missing.`);
            return res.status(400).json({ error: 'Название, содержание и ID автора обязательны' });
        }

        const news = await News.create({ title, content, author_id });
        logToFile(`News created: ${news.id} - ${title}`);
        res.status(201).json({ message: 'Новость создана', news });
    } catch (error) {
        console.error('Error creating news:', error);
        logToFile(`Error creating news: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll();
        logToFile(`Retrieved all news: ${news.length} items`);
        res.json(news);
    } catch (error) {
        console.error('Error retrieving news:', error);
        logToFile(`Error retrieving news: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
