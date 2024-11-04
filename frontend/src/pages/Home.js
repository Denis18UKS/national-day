import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Импортируем стили

function Home() {
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('news'); // По умолчанию показываем новости

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news/all');
                setNews(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events/all');
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке мероприятий:', error);
            }
        };

        fetchNews();
        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = date.getFullYear();
        return `${day}.${month}.${year}`; // Форматируем дату в нужный формат
    };

    const renderContent = () => {
        if (filter === 'news') {
            return news.map((item) => (
                <div key={item.id} className="news-item">
                    <h3>Название: {item.title}</h3>
                    <p>Описание:<br /> {item.content}</p>
                    <p><strong>Автор:</strong> {item.author ? item.author.username : 'Неизвестно'}</p>
                </div>
            ));
        } else if (filter === 'events') {
            // Фильтруем мероприятия по статусу
            const acceptedEvents = events.filter(item => item.status === 'принята');
            return acceptedEvents.map((item) => (
                <div key={item.id} className="event-item">
                    <h3>Название: {item.title}</h3>
                    <p>Описание: {item.description}</p>
                    <p>Адрес: {item.address}</p>
                    <p><strong>Дата начала:</strong> {formatDate(item.start_date)}</p>
                    <p><strong>Время начала:</strong> {item.start_time}</p>
                    <p><strong>Время окончания:</strong> {item.end_time}</p>
                    {/* Предполагается, что у вас есть информация о пользователе */}
                </div>
            ));
        }
    };

    return (
        <div className="home-container">
            <h1>Новости и мероприятия</h1>
            <div className="filter-buttons">
                <button className={`filter-button ${filter === 'news' ? 'active' : ''}`} onClick={() => setFilter('news')}>Новости</button>
                <button className={`filter-button ${filter === 'events' ? 'active' : ''}`} onClick={() => setFilter('events')}>Мероприятия</button>
            </div>
            <div className="content-container">
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;
