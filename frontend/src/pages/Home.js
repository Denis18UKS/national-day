import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('news'); // По умолчанию показываем новости

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news'); // Предполагается, что ваш API возвращает список новостей
                setNews(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events'); // Предполагается, что ваш API возвращает список мероприятий
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке мероприятий:', error);
            }
        };

        fetchNews();
        fetchEvents();
    }, []);

    const renderContent = () => {
        if (filter === 'news') {
            return news.map((item) => (
                <div key={item.id} className="news-item">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <p><strong>Автор:</strong> {item.author.name}</p> {/* Предполагается, что у вас есть информация о пользователе */}
                </div>
            ));
        } else if (filter === 'events') {
            return events.map((item) => (
                <div key={item.id} className="event-item">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><strong>Дата:</strong> {item.start_date} - {item.end_date}</p>
                    <p><strong>Организатор:</strong> {item.organizer.name}</p> {/* Предполагается, что у вас есть информация о пользователе */}
                </div>
            ));
        }
    };

    return (
        <div>
            <h1>Новости и мероприятия</h1>
            <div>
                <button onClick={() => setFilter('news')}>Новости</button>
                <button onClick={() => setFilter('events')}>Мероприятия</button>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;
