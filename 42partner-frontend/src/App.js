import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RoomListPage from './pages/RoomListPage';
import SelectPage from './pages/SelectPage';
import TempRandom from './pages/TempRandom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="select" element={<SelectPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="lunch_roomlist" element={<RoomListPage />} />
        <Route path="lunch_random" element={<TempRandom />} />
      </Routes>
    </div>
  );
};

export default App;
