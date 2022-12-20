import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import '../../styles/ModalTemplate.scss';

const ModalTemplate = ({ open, onClose, children, custom }) => {
  const customClassName = () => {
    let name = 'modal-box ';
    if (custom !== '') name += custom;
    return name;
  };

  return (
    <div className="modal-template">
      <Modal open={open} onClose={onClose}>
        <Box className={customClassName()}>{children}</Box>
      </Modal>
    </div>
  );
};

ModalTemplate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  custom: PropTypes.string,
};

ModalTemplate.defaultProps = {
  custom: '',
};

export default ModalTemplate;
