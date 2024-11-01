import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('все');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await axios.get('/api/events/all');
        setEvents(response.data);
    };

    const handleStatusChange = async (id, status) => {
        await axios.patch('http://localhost:5000/api/events/update-status', { id, status });
        fetchEvents();
    };

    const filteredEvents = events.filter(event => filter === 'все' || event.status === filter);

    return (
        <div>
            <h2>Заявки на мероприятия</h2>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="все">Все</option>
                <option value="принята">Принятые</option>
                <option value="отклонена">Отклоненные</option>
            </select>
            <ul>
                {filteredEvents.map(event => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Статус: {event.status}</p>
                        <button onClick={() => handleStatusChange(event.id, 'принята')}>Принять</button>
                        <button onClick={() => handleStatusChange(event.id, 'отклонена')}>Отклонить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminEvents;
