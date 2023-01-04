import React, { useEffect } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId, setToken } from '../modules/login';
import client from '../api/client';

const MainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = qs.parse(window.location.search);

  useEffect(() => {
    dispatch(setUserId(params.userId));
    dispatch(setToken(params.access_token));

    if (Object.keys(params).length !== 0) {
      localStorage.setItem('accessToken', params.access_token);
      localStorage.setItem('userId', params.userId);
      /* eslint-disable dot-notation */
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${params.access_token}`;
    }
    navigate('/select');
  }, []);

  return (
    <div>
      <h1>This is Main Page.</h1>You will soon be taken to another page...
    </div>
  );
};

export default MainForm;
