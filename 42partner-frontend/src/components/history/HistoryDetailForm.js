import React from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import '../../styles/HistoryDetailForm.scss';
import HistoryDetailContent from './HistoryDetailContent';

const HistoryDetailForm = ({ open, onClose }) => {
  const { detail } = useSelector(({ mypage }) => ({
    detail: mypage.detail,
  }));

  return (
    <div className="history-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {detail && <HistoryDetailContent detail={detail} />}
    </div>
  );
};

HistoryDetailForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistoryDetailForm;
