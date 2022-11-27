// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
// import useHistory from 'react-router-dom';
import '../styles/LoginForm.scss';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const requestLogin = () => {
    window.location.href =
      'https://api.42partner.com/oauth2/authorization/authclient';
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
