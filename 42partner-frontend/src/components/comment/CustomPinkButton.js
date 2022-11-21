import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
    cancle: {
      main: '#b5d7f5',
    },
    complete: {
      main: '#96B0E5',
    },
  },
});

const CustomPinkButton = ({ button }) => {
  return <ThemeProvider theme={theme}>{button}</ThemeProvider>;
};

CustomPinkButton.propTypes = {
  button: PropTypes.element.isRequired,
};

export default CustomPinkButton;
