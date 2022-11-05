import React from 'react';
import Button from '@mui/material/Button';
import '../styles/LoginForm.scss';

const LoginForm = () => {
  return (
    <div className="login-form">
      <div className="image-wrapper">
        <img alt="meal_icon" src="/images/meal_icon.png" />
        <img alt="study_icon" src="/images/study_icon.jpeg" />
      </div>
      <Button sx={{ m: 1, width: '220px' }} variant="contained">
        Sign in with 42 Intra
      </Button>
    </div>
  );
};

export default LoginForm;
