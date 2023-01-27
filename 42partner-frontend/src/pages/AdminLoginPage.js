import React from 'react';
import AdminLoginForm from '../components/AdminLoginForm';
import instance from '../api/api';

const AdminLoginPage = () => {
  const handleLogin = async (body) => {
    /* eslint-disable dot-notation */
    const formData = new FormData();
    let result;

    formData.append('username', body['username']);
    formData.append('password', body['password']);
    try {
      result = await instance.post(`/api/auth/login`, formData);
    } catch (e) {
      // 로그인 실패 창 띄우기
      window.location.href = '/admin/login';
    }
    localStorage.setItem('accessToken', result.data.accessToken);
    localStorage.setItem('userId', result.data.userId);
    window.location.href = '/';
  };
  return <AdminLoginForm onClickLogin={handleLogin} />;
};

export default AdminLoginPage;
