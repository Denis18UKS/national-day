import React, { useState } from 'react';
import axios from 'axios';
import './CreateNews.css'; // Импортируем стили

function CreateNews() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const author_id = localStorage.getItem('userId'); // Получаем ID пользователя из localStorage

        if (!author_id) {
            alert('Ошибка: вы не авторизованы');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/news/create', {
                title,
                content: description,
                author_id // Передаем author_id
            });

            if (response.status === 201) {
                alert('Новость создана!');
                setTitle('');
                setDescription('');
            } else {
                alert('Произошла ошибка при создании новости');
            }
        } catch (error) {
            console.error('Ошибка создания новости: ', error);
            alert('Произошла ошибка при создании новости');
        }
    };

    return (
        <div className="create-news-container">
            <h2>Создание новости</h2>
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
                <button type="submit" className="submit-button">Создать новость</button>
            </form>
        </div>
    );
}

export default CreateNews;
