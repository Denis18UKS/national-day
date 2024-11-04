// backend/routes/eventRoutes.js
const express = require('express');
const { createEvent, getAllEvents, updateEventStatus } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', createEvent);
router.get('/all', getAllEvents);
router.patch('/update-status', updateEventStatus); // Используем PATCH для обновления статуса

module.exports = router;
