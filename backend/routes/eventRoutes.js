const express = require('express');
const { createEvent, getAllEvents, updateEventStatus } = require('../controllers/eventController');
const router = express.Router();

// Замените "routes" на "router"
router.post('/create', createEvent);
router.get('/all', getAllEvents);
router.patch('/update-status', updateEventStatus);

module.exports = router;
