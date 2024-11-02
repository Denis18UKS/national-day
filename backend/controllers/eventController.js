const fs = require('fs');
const Event = require('../models/Event');

const logToFile = (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('logEvents.txt', `${timestamp} - ${message}\n`);
};

// Создание заявки
exports.createEvent = async (req, res) => {
    try {
        const { title, description, address, start_date, start_time, end_time, organizer_id } = req.body;

        // Логирование входящих данных для проверки
        logToFile(`Received data for event creation: ${JSON.stringify({ 
            title, 
            description, 
            address, 
            start_date, 
            start_time, 
            end_time, 
            organizer_id 
        })}`);

        // Проверка на наличие обязательных полей
        if (!title || !description || !address || !start_date || !start_time || !end_time || !organizer_id) {
            logToFile('Validation failed: missing fields');
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }

        const event = await Event.create({
            title,
            description,
            address,
            start_date,
            start_time,
            end_time,
            organizer_id
        });

        logToFile(`Event successfully created: ${JSON.stringify(event)}`);
        res.json({ message: 'Заявка отправлена', event });
    } catch (error) {
        logToFile(`Error creating event: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
