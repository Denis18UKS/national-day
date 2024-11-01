import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Регистрация успешна!');
        } catch (error) {
            alert('Ошибка регистрации');
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}

export default Register;
