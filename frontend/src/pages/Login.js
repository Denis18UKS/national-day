import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ setIsAuthenticated, setUserRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            const { id, role } = response.data;

            localStorage.setItem('userId', id);
            localStorage.setItem('userRole', role);

            setIsAuthenticated(true);
            setUserRole(role);

            window.location.href = '/';
        } catch (error) {
            setError('Ошибка авторизации. Проверьте свои данные.');
            console.error('Ошибка при авторизации:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
