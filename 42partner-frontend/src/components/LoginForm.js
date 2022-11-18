// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
// import useHistory from 'react-router-dom';
import '../styles/LoginForm.scss';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

axios.defaults.withCredentials = true;

const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  // const history = useHistory();

  const tmp = async () => {
    // let json;
    // await axios
    //   .create({
    //     baseURL: 'http://15.165.146.60:8080/oauth2/authorization/authclient',
    //     withCredentials: true,
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //   .get()
    //   .then((res) => {
    window.location.href =
      'http://15.165.146.60:8080/oauth2/authorization/authclient';
    window.open('/study/random', 'self');
    // console.log(res.data);
    // if (res.state === 300) json = res.body;
    // console.log(json);
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log(json);
    //   });
  };

  const requestLogin = () => {
    // window.location.href = process.env.REACT_APP_OAUTH_LOGIN_URL;

    tmp();

    //   const login = window.location.href
    // if (login) {
    //   history.push('/test');
    // } else {
    //   history.push('/login');
    // }

    // console.log(a.close);
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
