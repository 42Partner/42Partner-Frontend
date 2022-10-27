import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';

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
      <h3>랜덤매칭</h3>
      <h3>20nn-nn-nn</h3>
      <h3>intra_id1, intra_id2, intra_id3</h3>

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
          asdf
        </ModalTemplate>
      </div>
    </div>
  );
};

export default HistroyItem;
