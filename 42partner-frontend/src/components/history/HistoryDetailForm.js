import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/HistoryDetailForm.scss';
import { getDetail } from '../../modules/mypage';
import HistoryDetailContent from './HistoryDetailContent';

// eslint-disable-next-line react/prop-types
const HistoryDetailForm = ({ matchId, open, onClose }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(({ mypage }) => ({
    detail: mypage.detail,
  }));

  useEffect(() => {
    dispatch(getDetail({ matchId }));
  }, []);

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
