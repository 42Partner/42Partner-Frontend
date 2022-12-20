import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ErrorSnackBar = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity="error" variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

ErrorSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorSnackBar;
