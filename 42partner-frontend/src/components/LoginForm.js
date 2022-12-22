import React from 'react';
// import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import '../styles/LoginForm.scss';
// import { requestLogin } from '../modules/login';

const LoginForm = () => {
  // const dispatch = useDispatch();

  const login = async () => {
    // await dispatch(requestLogin());

    // window.location.assign(
    //   'https://api.42partner.com/oauth2/authorization/authclient',
    // );
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
        onClick={login}
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
