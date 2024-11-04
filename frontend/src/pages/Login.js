import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Импортируем стили

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Для отображения ошибок

    const handleLogin = async (event) => {
        event.preventDefault(); // Отменяем стандартное поведение формы
        setError(''); // Сбрасываем ошибки перед новой попыткой

        if (!username || !password) {
            setError('Пожалуйста, заполните все поля'); // Валидация полей
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Сохраняем ID пользователя в localStorage
            setIsAuthenticated(true); // Устанавливаем состояние авторизации
            alert('Вход успешен!');
        } catch (error) {
            setError('Ошибка входа: неверный логин или пароль'); // Сообщение об ошибке
        }
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Отображаем ошибки */}
        </div>
    );
}

export default Login;
