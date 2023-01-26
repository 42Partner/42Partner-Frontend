import React from 'react';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import '../styles/LoginForm.scss';

const LoginForm = () => {
  const requestLogin = () => {
    window.location.href =
      'https://api.v2.42partner.com/oauth2/authorization/authclient';
  };

  return (
    <div className="login-form">
      <div className="image-wrapper">
        <RestaurantIcon className="icon" />
        <MenuBookIcon className="icon" />
      </div>
      <Button
        onClick={requestLogin}
        style={{
          color: 'white',
          backgroundColor: 'lightPink',
          fontFamily: 'ubuntu-medium',
          fontSize: '18px',
          boxShadow: '1.5px 1.5px 1.5px 1.5px lightgray ',
        }}
      >
        Login with 42Intra
      </Button>
    </div>
  );
};

export default LoginForm;
