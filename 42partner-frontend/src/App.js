import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MatchingHistoryPage from './pages/MatchingHistoryPage';
import RoomListPage from './pages/RoomListPage';
import SelectPage from './pages/SelectPage';
import Main from './pages/Main';
import MyPage from './pages/Mypage';
import Navbar from './components/common/Navbar';
import './styles/Layout.scss';
import Footer from './components/common/Footer';
import MealRandomPage from './pages/MealRandomPage';
import StudyRandomPage from './pages/StudyRandomPage';
import './App.scss';

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
            <Route path="meal/room" element={<RoomListPage />} />
            <Route path="study/random" element={<StudyRandomPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/history" element={<MatchingHistoryPage />} />
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
