import React from 'react';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import '../styles/LoginForm.scss';

const LoginForm = () => {
  const requestLogin = () => {
    window.location.href =
      'https://api.42partner.com/oauth2/authorization/authclient';
  };

  return (
    <div className="login-form">
      <div className="image-wrapper">
        <RestaurantIcon className="icon" />
        <MenuBookIcon className="icon" />
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
