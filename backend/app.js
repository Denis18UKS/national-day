// backend/app.js
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes'); // Подключаем маршруты новостей
const eventRoutes = require('./routes/eventRoutes'); // Подключаем маршруты событий
require('dotenv').config();
const session = require('express-session');
const cors = require('cors'); // Подключаем cors

const app = express();
app.use(express.json());

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:3000', // Разрешаем запросы с вашего фронтенда
  credentials: true, // Разрешаем использование куки
}));

// Настройка сессий
app.use(session({
  secret: 'ff76c554aa496486ca40a4048d138a963f010016682136d5f', // Замените на свой секретный ключ
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Установите в true, если используете HTTPS
}));

// Использование маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes); // Добавляем маршруты для новостей
app.use('/api/events', eventRoutes); // Добавляем маршруты для событий

// Проверка подключения к базе данных и запуск сервера
sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Сервер запущен на http://localhost:5000'));
}).catch(err => {
  console.error('Ошибка подключения к базе данных:', err);
});
