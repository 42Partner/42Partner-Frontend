import React from 'react';
import Button from '@mui/material/Button';
import '../styles/RoomDetailForm.scss';
import TextField from '@mui/material/TextField';
import CommentLIst from './CommentLIst';

const RoomDetailForm = () => {
  return (
    <div className="room-detail-form">
      <h1 id="text-part">Title</h1>
      <h3>Intra_id</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="select-info-wrapper">
        <div>장소 : 개포 </div>
        <div>시간대 : 점심</div>
        <div> 배달여부 : 배달</div>
      </div>
      <p className="hashtag">#text1 #text #text #tadsfasdf</p>
      <div id="text-part" className="button-wrapper">
        <Button id="button" variant="contained">
          참여
        </Button>
        <Button
          style={{ background: '#cccccc', color: 'black' }}
          id="button"
          variant="contained"
        >
          취소
        </Button>
      </div>
      <h1 id="text-part">댓글</h1>
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        id="room-textarea"
        placeholder="댓글 내용을 입력해 주세요"
        multiline
        inputProps={{ maxLength: 100 }}
      />
      <CommentLIst />
    </div>
  );
};

export default RoomDetailForm;
