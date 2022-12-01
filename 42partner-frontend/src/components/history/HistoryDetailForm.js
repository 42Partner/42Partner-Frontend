/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/HistoryDetailForm.scss';
import { getDetail } from '../../modules/mypage';
import HistoryDetailContent from './HistoryDetailContent';

const HistoryDetailForm = ({ matchId, open, onClose }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(({ mypage }) => ({
    detail: mypage.detail,
  }));
  console.log('222222', detail);

  useEffect(() => {
    console.log('hihhi!', detail);
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

      {/* <div className="paragraph">
        {ConvertMap.get()}
        <h2>
          [{mealOrStudy}]{randomOrRoom}
        </h2>
      </div>
      <div className="select-info-wrapper">
        {mealOrStudy === '밥트너' ? (
          <>
            <div>장소 : {place}</div>
            {randomOrRoom === '랜덤매칭' ? null : (
              <div>시간대 : {timeToEat}</div>
            )}
            <div>배달여부 : {wayToEat}</div>
            <h1>MEAL</h1>
          </>
        ) : (
          <>
            <div>장소 : {place} </div>
            <div>학습 종류 : {typeToStudy}</div>
            <h1>STUDY</h1>
          </>
        )}
      </div> */}
    </div>
  );
};

HistoryDetailForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistoryDetailForm;
