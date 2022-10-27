import React, { useState } from 'react';
import '../../styles/RoomItem.scss';
import Button from '@mui/material/Button';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';

const RoomItem = () => {
  const [join, setJoin] = useState(false);
  const [open, setOpen] = useState(false);

  const joinRoom = () => {
    setJoin(true);
  };
  const exitRoom = () => {
    setJoin(false);
  };

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  return (
    <div className="room-item">
      <div>
        <h3>intra_id</h3>
        <h2>제목</h2>
        <span>
          참여 인원 n/5
          <span style={{ color: 'green' }}> 시간대</span>
          <span style={{ color: 'blue' }}> 개포</span>
        </span>
      </div>
      <div className="right-info">
        <p className="hashtag">#test #test #test</p>
        <div className="button-wrapper">
          {join === false ? (
            <Button id="button" variant="contained" onClick={joinRoom}>
              참여
            </Button>
          ) : (
            <Button
              style={{ background: '#d44c57' }}
              id="button"
              variant="contained"
              onClick={exitRoom}
            >
              참여 취소
            </Button>
          )}
          <Button
            style={{ background: '#cccccc', color: 'black' }}
            id="button"
            variant="contained"
            onClick={handleWriteOpen}
          >
            상세
          </Button>
          <ModalTemplate open={open} onClose={handleWriteClose}>
            <RoomDetailForm />
          </ModalTemplate>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
