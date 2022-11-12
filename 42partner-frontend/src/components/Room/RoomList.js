import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
  const [open, setOpen] = useState(false);
  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

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
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
      <RoomItem articleId="asdfasdf" />
    </div>
  );
};

export default RoomList;
