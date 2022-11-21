import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import ModalTemplate from '../common/ModalTemplate';
import CreateRoomForm from './CreateRoomForm';
import { loadRoomList } from '../../modules/rooms';
import RoomList from './RoomList';
import '../../styles/RoomContainer.scss';
import CustomPinkButton from '../comment/CustomPinkButton';

const RoomContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { roomList, roomListLoading } = useSelector(({ rooms, loading }) => ({
    roomList: rooms.roomList,
    roomListLoading: loading['rooms/LOADLIST'],
  }));
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('MEAL');
  const [curList, setCurList] = useState([]);

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (location.pathname.includes('meal')) {
      setTopic('MEAL');
    } else {
      setTopic('STUDY');
    }
  }, [location]);

  useEffect(() => {
    dispatch(loadRoomList());
  }, []);

  useEffect(() => {
    if (roomList !== undefined && roomList !== null) {
      setCurList(roomList.filter((room) => room.contentCategory === topic));
    }
  }, [roomList]);

  return (
    <div className="room-container">
      <CustomPinkButton
        button={
          <Fab
            className="create-button"
            color="primary"
            aria-label="add"
            onClick={handleWriteOpen}
          >
            <AddIcon />
          </Fab>
        }
      />
      <ModalTemplate open={open} onClose={handleWriteClose}>
        <CreateRoomForm
          editMode={false}
          topic={topic}
          open={open}
          onClose={handleWriteClose}
        />
      </ModalTemplate>
      {roomListLoading && (
        <div className="loading-icon">
          <CustomPinkButton button={<CircularProgress />} />
        </div>
      )}
      {curList.length ? (
        <RoomList roomList={curList} />
      ) : (
        <span className="loading-icon">방이 존재하지 않습니다</span>
      )}
    </div>
  );
};

export default RoomContainer;
