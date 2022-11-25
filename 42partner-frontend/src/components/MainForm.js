import React, { useEffect } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId } from '../modules/login';
import client from '../api/client';

const MainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = qs.parse(window.location.search);

  useEffect(() => {
    dispatch(setUserId(params.userId));

    if (Object.keys(params).length === 0) {
      navigate('/login');
    } else {
      client.defaults.headers.common.Authorization = `Bearer ${params.access_token}`;
      navigate('/select');
    }
  }, []);

  return <div>Main Page</div>;
};

export default MainForm;
