import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css'; // Импортируем стили

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Отправка формы с данными:', {
            title,
            description,
            address,
            startDate,
            startTime,
            endTime,
            organizer_id: localStorage.getItem('userId')
        });

        if (!title || !description || !address || !startDate || !startTime || !endTime) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const organizer_id = localStorage.getItem('userId');
        if (!organizer_id) {
            alert("Идентификатор организатора не найден.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/events/create', {
                title,
                description,
                address,
                start_date: startDate,
                start_time: startTime,
                end_time: endTime,
                organizer_id
            });

            console.log('Ответ сервера:', response);

            if (response.status === 201 || response.status === 200) {
                alert('Заявка отправлена');
                setTitle('');
                setDescription('');
                setAddress('');
                setStartDate('');
                setStartTime('');
                setEndTime('');
            } else {
                alert('Произошла ошибка при подаче заявки');
            }
        } catch (error) {
            console.error('Ошибка отправки заявки', error);
            alert('Произошла ошибка при подаче заявки');
        }
    };

    return (
        <div className="create-event-container">
            <h2>Подать заявку</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Адрес"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                />
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="input-field"
                />
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Подать заявку</button>
            </form>
        </div>
    );
}

export default CreateEvent;
