// App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Events from './pages/Events';
import CreateNews from './pages/CreateNews';
import CreateEvent from './pages/CreateEvent';
import ApplicationHistory from './pages/ApplicationHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <Sidebar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/events" element={<Events />} />

        {/* Новые маршруты для авторизованных пользователей */}
        {isAuthenticated && (
          <>
            <Route path="/create-news" element={<CreateNews />} />
            <Route path="/submit-application" element={<CreateEvent />} />
            <Route path="/application-history" element={<ApplicationHistory />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
