import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';
import { getDetail } from '../../modules/mypage';

// eslint-disable-next-line react/prop-types
const HistroyItem = ({ id, content, method, date }) => {
  //   const [category, setCategory] = useState([]);
  //   setCategory([...content, method]);
  const matchId = id;

  const dispatch = useDispatch();
  const { detail } = useSelector(({ mypage }) => ({
    detail: mypage.detail,
  }));
  console.log('222222', detail);
  //   console.log('History Item: ', matchId);
  useEffect(() => {
    console.log('hihhi!', detail);
    dispatch(getDetail({ matchId }));
  }, []);
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
            detail={detail}
            open={open}
            onClose={handleDetaileClose}
          />
        </ModalTemplate>
      </div>
    </div>
  );
};

export default HistroyItem;
