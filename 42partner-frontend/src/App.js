import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
