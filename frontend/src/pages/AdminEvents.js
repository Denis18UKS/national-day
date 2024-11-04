import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

function Events() {
    const [events, setEvents] = useState([]);
    const [userRole, setUserRole] = useState(''); // Предполагаем, что роль будет загружена при монтировании

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events/all');
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке мероприятий:', error);
            }
        };

        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/role', { withCredentials: true });
                // Эндпоинт для получения роли
                setUserRole(response.data.role); // Устанавливаем роль пользователя
            } catch (error) {
                console.error('Ошибка при загрузке роли пользователя:', error);
            }
        };

        fetchEvents();
        fetchUserRole();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleAccept = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/events/${id}/accept`);
            setEvents(events.map(event => event.id === id ? { ...event, status: 'принято' } : event));
        } catch (error) {
            console.error('Ошибка при принятии заявки:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/events/${id}/reject`);
            setEvents(events.map(event => event.id === id ? { ...event, status: 'отклонено' } : event));
        } catch (error) {
            console.error('Ошибка при отклонении заявки:', error);
        }
    };

    const renderContent = () => {
        return events.map((item) => (
            <div key={item.id} className="event-item">
                <h3>Название: {item.title}</h3>
                <p>Описание: {item.description}</p>
                <p>Адрес: {item.address}</p>
                <p><strong>Дата начала:</strong> {formatDate(item.start_date)}</p>
                <p><strong>Время начала:</strong> {item.start_time}</p>
                <p><strong>Время окончания:</strong> {item.end_time}</p>
                <p><strong>Статус:</strong> {item.status}</p>
                {userRole === 'admin' && (
                    <div>
                        <button onClick={() => handleAccept(item.id)} className="accept-button">Принять</button>
                        <button onClick={() => handleReject(item.id)} className="reject-button">Отклонить</button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="events-container">
            <h1>История заявок</h1>
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default Events;
