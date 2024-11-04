// backend/controllers/eventController.js
const Event = require('../models/Event');
const fs = require('fs');
const path = require('path');

// Функция для логирования
const logToFile = (message) => {
    const logPath = path.join(__dirname, '..', 'logs', 'logEvents.txt'); // Путь к лог-файлу
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logPath, logMessage, (err) => {
        if (err) console.error('Ошибка при записи в лог:', err);
    });
};

// Создание нового мероприятия
exports.createEvent = async (req, res) => {
    console.log('Received request to create event:', req.body);
    logToFile(`Received request to create event: ${JSON.stringify(req.body)}`);

    try {
        const { title, description, address, start_date, start_time, end_time, organizer_id } = req.body;

        if (!title || !description || !address || !start_date || !start_time || !end_time || !organizer_id) {
            logToFile('Creation failed: Title, description, address, start date, start time, end time or organizer_id is missing.');
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
        console.error('Error creating event:', error);
        logToFile(`Error creating event: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Получение всех мероприятий
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll(); // Получаем все мероприятия из базы данных
        logToFile(`Retrieved all events: ${events.length} items`);
        res.json(events); // Возвращаем массив мероприятий
    } catch (error) {
        console.error('Error retrieving events:', error);
        logToFile(`Error retrieving events: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Обновление статуса мероприятия
// backend/controllers/eventController.js
exports.updateEventStatus = async (req, res) => {
    console.log('Received request to update event status:', req.body);

    try {
        const { id, status } = req.body; // ID события и новый статус

        if (!id || !status) {
            console.log('Update failed: ID or status is missing.');
            return res.status(400).json({ error: 'ID и статус должны быть указаны' });
        }

        const event = await Event.findByPk(id);
        if (!event) {
            console.log(`Update failed: Event with ID ${id} not found.`);
            return res.status(404).json({ error: 'Событие не найдено' });
        }

        event.status = status; // Обновляем статус
        await event.save(); // Сохраняем изменения в базе данных

        console.log(`Event status updated successfully: ${JSON.stringify(event)}`);
        res.json({ message: 'Статус события обновлён', event });
    } catch (error) {
        console.error('Error updating event status:', error);
        res.status(500).json({ error: error.message });
    }
};
