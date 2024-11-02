const Event = require('../models/Event');

// Создание заявки
exports.createEvent = async (req, res) => {
    try {
        const { title, description, address, start_date, start_time, end_time, organizer_id } = req.body;
        // Проверка на наличие обязательных полей
        if (!title || !description || !address || !start_date || !start_time || !end_time || !organizer_id) {
            return res.status(400).json({ error: 'Все поля должны быть заполнены' });
        }
        
        const event = await Event.create({ title, description, address, start_date, start_time, end_time, organizer_id });
        res.json({ message: 'Заявка отправлена', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Получение всех заявок со статусом принята
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ where: { status: 'принята' } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Изменение статуса заявки
exports.updateEventStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        const event = await Event.findByPk(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.status = status;
        await event.save();

        res.json({ message: 'Статус обновлен', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
