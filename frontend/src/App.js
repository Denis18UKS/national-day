import React, { useState, useEffect } from 'react';
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
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <>
      <Sidebar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
        />
        <Route path="/events" element={<Events />} />

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
