import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Импортируем стили

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Для отображения ошибок

    const handleRegister = async (event) => {
        event.preventDefault(); // Отменяем стандартное поведение формы
        setError(''); // Сбрасываем ошибки перед новой попыткой

        if (!username || !password) {
            setError('Пожалуйста, заполните все поля'); // Валидация полей
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Регистрация успешна!');
            // Очистка полей после успешной регистрации
            setUsername('');
            setPassword('');
        } catch (error) {
            setError('Ошибка регистрации: ' + (error.response?.data?.message || 'Попробуйте снова')); // Сообщение об ошибке
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Отображаем ошибки */}
        </div>
    );
}

export default Register;
