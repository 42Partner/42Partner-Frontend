import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
// import axios from 'axios';
import '../../styles/HistoryDetailForm.scss';

const HistoryDetailForm = ({ id, content, open, onClose }) => {
  console.log(id);
  //   const [isRoom, setIsRoom] = useState(false);
  const [detail, setDetail] = useState({});
  useEffect(() => {
    const getMatchDetail = async () => {
      try {
        // const matchDetail = await axios.get(
        //   `${process.env.REACT_APP_API_KEY}/matches/${id}`,
        // );
        const matchDetail = {
          contentCategory: 'MEAL',
          createdAt: '2022-11-23T11:29:31.892Z',
          matchConditionDto: {
            placeList: 'SEOCHO',
            timeOfEatingList: 'BREAKFAST, LUNCH',
            typeOfStudyList: ' INNER_CIRCLE',
            wayOfEatingList: ' DELIVERY',
          },
          matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
          matchStatus: 'MATCHED',
          methodCategory: 'MANUAL',
          participantNum: 4,
        };
        console.log(matchDetail);
        console.log('!!!!', detail);
        setDetail({ ...detail }, matchDetail);
        console.log('!!!!2', detail);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getMatchDetail();
    console.log(id);
    console.log('~~~', detail);
  }, []);

  return (
    <div className="history-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="paragraph">
        <h2>[{content}] 랜덤매칭</h2>
        <h3>{detail.participants}</h3>
      </div>
      <div className="select-info-wrapper">
        {content === '밥트너' ? (
          <>
            <div>장소 : {detail.place} </div>
            <div>시간대 : {detail.time}</div>
            <div> 배달여부 : {detail.mealWay}</div>
          </>
        ) : (
          <>
            <div>장소 : {detail.place} </div>
            <div>학습 종류: {detail.studyType}</div>
          </>
        )}
      </div>
    </div>
  );
};

HistoryDetailForm.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistoryDetailForm;
