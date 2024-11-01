import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isAuthenticated, onLogout }) {
    return (
        <nav>
            <ul>
                <li><Link to="/">Главная</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/events">Мероприятия</Link></li>
                        <li><Link to="/create-news">Создать новость</Link></li>
                        <li><Link to="/submit-application">Подать заявку</Link></li>
                        <li><Link to="/application-history">История заявок</Link></li>
                        <li><button onClick={onLogout}>Выйти</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/login">Вход</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Sidebar;
