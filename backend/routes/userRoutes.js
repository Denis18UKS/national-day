const express = require('express');
const { getUserRole } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware'); // Импортируем middleware
const router = express.Router();

router.get('/role', authenticate, getUserRole);

module.exports = router;
