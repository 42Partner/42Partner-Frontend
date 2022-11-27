import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../../styles/HistroyItem.scss';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';
import Instance from '../common/Instance';

// eslint-disable-next-line react/prop-types
const HistroyItem = ({ id, content, method, date }) => {
  //   const [category, setCategory] = useState([]);
  //   setCategory([...content, method]);
  const matchId = id;
  const [detail, setDetail] = useState({});
  useEffect(() => {
    const getMatchDetail = async () => {
      try {
        const matchDetail = await Instance.get(
          `${process.env.REACT_APP_API_KEY}/matches/${id}`,
        );
        // const matchDetail = {
        //   contentCategory: 'MEAL',
        //   createdAt: '2022-11-23T11:29:31.892Z',
        //   matchConditionDto: {
        //     placeList: ['SEOCHO'],
        //     timeOfEatingList: ['BREAKFAST', 'LUNCH'],
        //     typeOfStudyList: ['INNER_CIRCLE'],
        //     wayOfEatingList: ['DELIVERY'],
        //   },
        //   matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
        //   matchStatus: 'MATCHED',
        //   methodCategory: 'MANUAL',
        //   participantNum: 4,
        // };
        setDetail({ ...matchDetail });
      } catch (e) {
        Promise.reject(e);
      }
    };
    getMatchDetail(matchId);
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
