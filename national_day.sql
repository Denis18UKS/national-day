-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 02 2024 г., 08:48
-- Версия сервера: 5.7.39-log
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `national_day`
--

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `status` enum('отправлена','принята','отклонена') COLLATE utf8mb4_unicode_ci DEFAULT 'отправлена',
  `organizer_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `address`, `start_date`, `start_time`, `end_time`, `status`, `organizer_id`, `createdAt`, `updatedAt`) VALUES
(14, 'dwdwdw', 'dwdwwddw', 'wddwdw', '2024-12-12', '12:12:00', '14:14:00', 'отправлена', 2, '2024-11-02 04:52:26', '2024-11-02 04:52:26'),
(15, 'dwdwdw', 'dwdwwddw', 'wddwdw', '2024-12-12', '12:12:00', '14:14:00', 'отправлена', 2, '2024-11-02 04:52:50', '2024-11-02 04:52:50'),
(16, 'вцвц', 'вцвцвц', 'вцвцвц', '2024-12-12', '12:12:00', '14:14:00', 'отправлена', 2, '2024-11-02 04:55:50', '2024-11-02 04:55:50'),
(17, 'wdwdw', 'dwdwdwd', 'dwdwdwdw', '2024-12-12', '12:12:00', '14:14:00', 'отправлена', 3, '2024-11-02 05:22:24', '2024-11-02 05:22:24'),
(18, 'вццввц', 'вцвцвццввц', 'вцвц', '2024-12-12', '12:12:00', '14:14:00', 'отправлена', 3, '2024-11-02 05:24:14', '2024-11-02 05:24:14'),
(19, 'вцвц', 'вцвцвц', 'вцвццв', '2024-12-12', '16:16:00', '18:18:00', 'отправлена', 3, '2024-11-02 05:29:16', '2024-11-02 05:29:16');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `author_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `author_id`, `createdAt`, `updatedAt`) VALUES
(1, 'вцвцвцвц', 'dwdwdwdwdwdw', 2, '2024-11-01 19:27:02', '2024-11-01 19:27:02'),
(2, 'вцвцвц', 'цввцвццввц', 2, '2024-11-02 01:55:05', '2024-11-02 01:55:05'),
(3, 'вцвцвц', 'вцвцвц', 2, '2024-11-02 04:46:07', '2024-11-02 04:46:07');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(2, 'Dens1231', '$2a$10$GrXaGlpSvxINbyqPoejxZuDAcojPLQkMWHO45xy.Qa3GJXRZJ8A7O', 'user', '2024-11-01 19:05:45', '2024-11-01 19:05:45'),
(3, 'Александрg', '$2a$10$sshiY/GQKYDmgnBu7EhfNuMqAsv8vbwpajWLBgaO5WAvWPm6l02Ty', 'admin', '2024-11-02 04:56:18', '2024-11-02 04:56:18');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organizer_id` (`organizer_id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
