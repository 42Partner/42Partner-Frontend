import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RoomItem from './RoomItem';
import ModalTemplate from '../common/ModalTemplate';
import CreateRoomForm from './CreateRoomForm';
import '../../styles/RoomList.scss';
import Instance from '../common/Instance';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe3e3',
    },
  },
});

const RoomList = () => {
  const [open, setOpen] = useState(false);
  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const rooms = await Instance.get(
          `${process.env.REACT_APP_API_KEY}/articles`,
        );

        setRoomList(...roomList, rooms.content);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="room-list">
      <ThemeProvider theme={theme}>
        <Fab
          className="create-button"
          color="primary"
          aria-label="add"
          onClick={handleWriteOpen}
        >
          <AddIcon />
        </Fab>
      </ThemeProvider>
      <ModalTemplate open={open} onClose={handleWriteClose}>
        <CreateRoomForm />
      </ModalTemplate>
      {roomList &&
        roomList.map((room) => (
          <RoomItem
            key={room.articleId}
            date={room.date}
            anonymity={room.anonymity}
            nickname={room.nickname}
            title={room.title}
            content={room.content}
            participantNum={room.participantNum}
            participantNumMax={room.participantNumMax}
            isToday={room.isToday}
            contentCategory={room.contentCategory}
            matchConditionDto={room.matchConditionDto}
          />
        ))}
    </div>
  );
};

export default RoomList;
