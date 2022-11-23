/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../../styles/RoomDetailForm.scss';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import CommentList from '../comment/CommentList';

const RoomDetailForm = ({
  open,
  onClose,
  title,
  content,
  anonymity,
  nickname,
  participantNum,
  participantNumMax,
  isToday,
  date,
  contentCategory,
  place,
  timeOfEat,
  typeOfStudy,
  wayOfEat,
}) => {
  // console.log(room);
  return (
    <div className="room-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <h2 className="paragraph">
        [{contentCategory}] {title}
      </h2>
      <h3> 방장 : {anonymity ? '익명' : nickname}</h3>
      <div className="select-info-wrapper">
        <div>
          인원 : {participantNum} / {participantNumMax}
        </div>
        <div>날짜 : {date}</div>
        <div>장소 : {place} </div>
        <div>시간대 : {timeOfEat}</div>
        <div>학습 종류 : {typeOfStudy}</div>
        <div>배달여부 : {wayOfEat}</div>
      </div>
      <p>{content}</p>
      <p className="hashtag">{isToday} #text #text #tadsfasdf</p>
      <div className="paragraph button-wrapper">
        <Button className="join-button" variant="contained">
          참여
        </Button>
      </div>
      <TextField
        sx={{ mb: 2, mt: 2 }}
        fullWidth
        id="room-textarea"
        placeholder="댓글 내용을 입력해 주세요"
        multiline
        inputProps={{ maxLength: 100 }}
      />
      <CommentList />
    </div>
  );
};

RoomDetailForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDetailForm;
