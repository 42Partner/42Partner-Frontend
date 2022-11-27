import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MealRoomPage from './pages/MealRoomPage';
import StudyRoomPage from './pages/StudyRoomPage';
import SelectPage from './pages/SelectPage';
import Main from './pages/Main';
import MyPage from './pages/Mypage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MealRandomPage from './pages/MealRandomPage';
import StudyRandomPage from './pages/StudyRandomPage';
import './App.scss';
import './styles/Layout.scss';

const App = () => {
  return (
    <div className="App">
      <div className="app-wrapper">
        <div>
          <Navbar />
        </div>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="select" element={<SelectPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="meal/random" element={<MealRandomPage />} />
            <Route path="meal/room" element={<MealRoomPage />} />
            <Route path="study/random" element={<StudyRandomPage />} />
            <Route path="study/room" element={<StudyRoomPage />} />
            <Route path="mypage" element={<MyPage />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
