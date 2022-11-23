import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';

// eslint-disable-next-line react/prop-types
const HistroyItem = ({ id, content, method, date }) => {
  //   const [category, setCategory] = useState([]);
  //   setCategory([...content, method]);
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
            id={id}
            content={content}
            open={open}
            onClose={handleDetaileClose}
          />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default HistroyItem;
