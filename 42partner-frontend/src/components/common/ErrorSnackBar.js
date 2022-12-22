import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ErrorSnackBar = ({ open, onClose, response }) => {
  const makeMessage = () => {
    if ('data' in response && response.data.message)
      return response.data.message;

    return `${response.status} ${response.statusText}`;
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity="error" variant="filled">
        {makeMessage()}
      </MuiAlert>
    </Snackbar>
  );
};

ErrorSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  response: PropTypes.object.isRequired,
};

export default ErrorSnackBar;
