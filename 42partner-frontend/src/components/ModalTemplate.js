import React from 'react';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

const ModalTemplate = ({ open, onClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>asdf</div>
      </Modal>
    </div>
  );
};

ModalTemplate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalTemplate;
