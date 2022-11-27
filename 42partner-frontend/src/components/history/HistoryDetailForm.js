/* eslint-disable react/prop-types */
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
// import axios from 'axios';
import '../../styles/HistoryDetailForm.scss';
import ConvertMap from '../common/ConvertMap';

const HistoryDetailForm = ({ detail, open, onClose }) => {
  console.log('##################', detail);

  console.log(detail.matchConditionDto.timeOfEatingList);

  const mealOrStudy = ConvertMap.get(detail.contentCategory);
  const randomOrRoom = ConvertMap.get(detail.methodCategory);
  const place = detail.matchConditionDto.placeList.map((ele) =>
    ConvertMap.get(ele),
  );
  const timeToEat = detail.matchConditionDto.timeOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );
  const wayToEat = detail.matchConditionDto.wayOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );
  const typeToStudy = detail.matchConditionDto.typeOfStudyList.map((ele) =>
    ConvertMap.get(ele),
  );

  return (
    <div className="history-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="paragraph">
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
      </div>
    </div>
  );
};

HistoryDetailForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistoryDetailForm;
