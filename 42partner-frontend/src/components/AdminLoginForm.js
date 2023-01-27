import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';

const AdminLoginForm = ({ onClickLogin }) => {
  const [id, setId] = useState('');
  const [passwd, setPassword] = useState('');

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    if (!id || !passwd) {
      alert('전부 입력해주세요!');
      return;
    }
    onClickLogin({
      username: id,
      password: passwd,
    });
    setId('');
    setPassword('');
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <>
      <TextField
        id="id"
        label="ID"
        variant="outlined"
        onChange={handleChangeId}
        onKeyPress={handlePressEnter}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        onChange={handleChangePassword}
        onKeyPress={handlePressEnter}
      />
      <Button variant="contained" onClick={handleClick}>
        login
      </Button>
    </>
  );
};

export default AdminLoginForm;

AdminLoginForm.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
};
