import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import RoomItem from './RoomItem';
import ModalTemplate from '../common/ModalTemplate';
import CreateRoomForm from './CreateRoomForm';
import '../../styles/RoomList.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe3e3',
    },
  },
});

const RoomList = () => {
  const topic = useLocation();

  const [isMeal, setIsMeal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (topic.pathname.includes('meal')) {
      setIsMeal(true);
    } else {
      setIsMeal(false);
    }
  }, [topic]);

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
        <CreateRoomForm
          isMeal={isMeal}
          open={open}
          onClose={handleWriteClose}
        />
      </ModalTemplate>
      <RoomItem articleId="3893d119-df59-418e-ad59-f86a1467abd6" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
      <RoomItem articleId="asdf" />
    </div>
  );
};

export default RoomList;
