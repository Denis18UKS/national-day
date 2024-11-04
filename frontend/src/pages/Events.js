import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events/all', { withCredentials: true });
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при получении мероприятий:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.patch('http://localhost:5000/api/events/update-status', {
                id,
                status
            }, { withCredentials: true });

            // Обновляем состояние локально, чтобы отобразить изменения на экране
            setEvents(events.map(event => event.id === id ? { ...event, status } : event));
        } catch (error) {
            console.error(`Ошибка при обновлении статуса заявки: ${error}`);
        }
    };


    const renderContent = () => {
        return events.map((item) => (
            <div key={item.id} className="event-item">
                <h3>Название: {item.title}</h3>
                <p>Описание: {item.description}</p>
                <p>Адрес: {item.address}</p>
                <p><strong>Дата начала:</strong> {item.start_date}</p>
                <p><strong>Время начала:</strong> {item.start_time}</p>
                <p><strong>Время окончания:</strong> {item.end_time}</p>
                <div>
                    <button onClick={() => handleStatusUpdate(item.id, 'принято')} className="accept-button">Принять</button>
                    <button onClick={() => handleStatusUpdate(item.id, 'отклонено')} className="reject-button">Отклонить</button>
                </div>
            </div>
        ));
    };

    return (
        <div className="events-container">
            <h2>События</h2>
            {renderContent()}
        </div>
    );
};

export default Events;
