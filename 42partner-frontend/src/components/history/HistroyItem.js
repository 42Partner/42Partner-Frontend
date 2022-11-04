import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';

const HistroyItem = () => {
  const [open, setOpen] = useState(false);
  const handleDetaileOpen = () => {
    setOpen(true);
  };
  const handleDetaileClose = () => {
    setOpen(false);
  };

  return (
    <div className="history-item">
      <h3>밥트너</h3>
      <h3>랜덤매칭</h3>
      <h3>20yy-mm-dd</h3>
      <div>
        <Button
          style={{ background: '#f1f1f1', color: 'black' }}
          id="button"
          variant="contained"
          onClick={handleDetaileOpen}
        >
          상세
        </Button>
        <ModalTemplate open={open} onClose={handleDetaileClose}>
          <HistoryDetailForm
            category="room"
            open={open}
            onClose={handleDetaileClose}
          />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default HistroyItem;
