import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/api/events/create', { title, description, address, start_date: startDate, start_time: startTime, end_time: endTime });
            alert('Заявка отправлена');
        } catch (error) {
            console.error('Ошибка отправки заявки', error);
        }
    };

    return (
        <div>
            <h2>Подать заявку</h2>
            <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <button onClick={handleSubmit}>Подать заявку</button>
        </div>
    );
}

export default CreateEvent;
