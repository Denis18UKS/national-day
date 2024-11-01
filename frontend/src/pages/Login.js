import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Сохраняем ID пользователя в localStorage
            setIsAuthenticated(true); // Устанавливаем состояние авторизации
            alert('Вход успешен!');
        } catch (error) {
            alert('Ошибка входа');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}

export default Login;
