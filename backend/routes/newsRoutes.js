const express = require('express');
const { createNews, getAllNews } = require('../controllers/newsController');
const router = express.Router();

router.post('/create', createNews);
router.get('/all', getAllNews);

module.exports = router;
