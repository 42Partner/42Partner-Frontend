import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
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
import instance from './api/api';

import './App.scss';
import './styles/Layout.scss';

const App = () => {
  const [flag, setFlag] = useState(0);
  const refreshToken = async (error) => {
    const refresh = axios.create({
      baseURL: 'https://api.42partner.com',
      withCredentials: true,
    });

    const retry = (errorConfig) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (errorConfig.method === 'get')
            resolve(instance.get(errorConfig.url));
          else if (errorConfig.method === 'post')
            resolve(instance.post(errorConfig.url));
        }, 500);
      });
    };

    let response;

    try {
      response = await refresh.post(`api/token/refresh`);
    } catch (e) {
      alert(e);
    }

    const newAccessToken = response.data.accessToken;

    /* eslint-disable dot-notation */
    instance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${newAccessToken}`;
    localStorage.setItem('accessToken', newAccessToken);
    setFlag(flag + 1);
    /* eslint-disable no-param-reassign */
    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
    error.config.headers.withCredentials = true;
    retry(error.config);
    return Promise.reject(error);
  };

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response.status === 401) {
        window.location.href = '/login';
      } else if (
        error.response.status === 403 &&
        error.response.data.code === 'AU001'
      ) {
        return refreshToken(error);
      } else if (error.response.status === 404) {
        alert('로그인이 필요합니다.');
        window.location.href = '/';
      }
      return Promise.reject(error);
    },
  );

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="select" element={<SelectPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="meal/random" element={<MealRandomPage />} />
            <Route path="meal/room" element={<MealRoomPage />} />
            <Route path="study/random" element={<StudyRandomPage />} />
            <Route path="study/room" element={<StudyRoomPage />} />
            <Route path="mypage" element={<MyPage flag={flag} />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
