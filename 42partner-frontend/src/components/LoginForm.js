import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import '../styles/LoginForm.scss';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const passwordHandleChange = (e) => {
    setPassword({
      ...password,
      password: e.target.value,
    });
  };

  const IdHandleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="login-form">
      <div>
        <img alt="lunch_icon" src="./images/lunch_icon.png" />
        <img alt="study_icon" src="./images/study_icon.jpeg" />
      </div>
      <div className="login-filed-wrapper">
        <TextField
          sx={{ m: 1, width: '250px' }}
          id="outlined-textarea"
          label="Id"
          placeholder="Placeholder"
          multiline
          onChange={IdHandleChange}
          value={id}
        />
        <Box sx={{ display: 'flex', flexwrapper: 'wrapper' }}>
          <div>
            <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={password.showPassword ? 'text' : 'password'}
                value={password.password}
                onChange={passwordHandleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {password.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        </Box>
        <Button sx={{ m: 1, width: '220px' }} variant="contained">
          Sign in with 42 Intra
        </Button>
        <Button sx={{ m: 1, width: '220px' }} variant="outlined">
          42이메일로 가입하기
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
