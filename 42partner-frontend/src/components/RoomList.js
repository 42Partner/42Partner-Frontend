import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RoomItem from './RoomItem';
import ModalTemplate from './ModalTemplate';

const floatingButtonStyle = {
  margin: 0,
  top: 'auto',
  right: 40,
  bottom: 150,
  left: 'auto',
  position: 'fixed',
};

const RoomList = () => {
  const [open, setOpen] = useState(false);
  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  return (
    <div className="room-list">
      <Fab
        style={floatingButtonStyle}
        color="primary"
        aria-label="add"
        onClick={handleWriteOpen}
      >
        <AddIcon />
      </Fab>
      <ModalTemplate open={open} onClose={handleWriteClose} />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
    </div>
  );
};

export default RoomList;
