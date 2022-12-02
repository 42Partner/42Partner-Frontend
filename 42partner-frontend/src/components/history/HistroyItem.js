import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import { useDispatch, useSelector } from 'react-redux';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';

// eslint-disable-next-line react/prop-types
const HistroyItem = ({ matchId, content, method, date }) => {
  const [open, setOpen] = useState(false);

  const handleDetaileOpen = () => {
    setOpen(true);
  };
  const handleDetaileClose = () => {
    setOpen(false);
  };

  return (
    <div className="history-item">
      <h3>{content}</h3>
      <h3>{method}</h3>
      <h3>{date}</h3>
      <div>
        <Button
          style={{ background: '#f1f1f1', color: 'black' }}
          className="detail-button"
          variant="contained"
          onClick={handleDetaileOpen}
        >
          상세
        </Button>
        <ModalTemplate open={open} onClose={handleDetaileClose}>
          <HistoryDetailForm
            matchId={matchId}
            open={open}
            onClose={handleDetaileClose}
          />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default HistroyItem;
