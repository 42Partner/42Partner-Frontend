import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LunchPage from './pages/LunchPage';
import SelectPage from './pages/SelectPage';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="select" element={<SelectPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="lunchPage" element={<LunchPage />} />
      </Routes>
    </div>
  );
};

export default App;
