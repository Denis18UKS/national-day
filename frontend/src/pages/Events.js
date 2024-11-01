import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events'); // Предполагается, что ваш API возвращает список мероприятий
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке мероприятий:', error);
            }
        };

        fetchEvents();
    }, []);

    const renderContent = () => {
        return events.map((item) => (
            <div key={item.id} className="event-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Дата:</strong> {item.start_date} - {item.end_date}</p>
                <p><strong>Организатор:</strong> {item.organizer.name}</p> {/* Предполагается, что у вас есть информация о пользователе */}
            </div>
        ));
    };

    return (
        <div>
            <h1>Мероприятия</h1>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default Events;
