import React from 'react';
import Button from '@mui/material/Button';
import '../styles/LoginForm.scss';
import axios from 'axios';

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const requestLogin = () => {
    window.location.href = process.env.REACT_APP_OAUTH_LOGIN_URL;
  };

  return (
    <div className="login-form">
      <div className="image-wrapper">
        <img alt="meal_icon" src="/images/meal_icon.png" />
        <img alt="study_icon" src="/images/study_icon.jpeg" />
      </div>
      <Button
        sx={{ m: 1, width: '220px' }}
        variant="contained"
        onClick={requestLogin}
      >
        Sign in with 42 Intra
      </Button>
    </div>
  );
};

export default LoginForm;
