import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import ModalTemplate from '../common/ModalTemplate';
import CreateRoomForm from './CreateRoomForm';
import { loadRoomList } from '../../modules/rooms';
import RoomList from './RoomList';
import CustomColorButton from '../common/CustomColorButton';
import '../../styles/RoomContainer.scss';

const RoomContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { articleList, requestError } = useSelector(({ rooms }) => ({
    articleList: rooms.roomList,
    requestError: rooms.requestError,
  }));
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('MEAL');
  const [curList, setCurList] = useState([]);
  const [conflict, setConflict] = useState(false);

  const handleWriteOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleWriteClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarHandler = () => {
    setConflict(false);
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
    if (articleList !== undefined && articleList !== null) {
      setCurList(articleList.filter((room) => room.contentCategory === topic));
    }
  }, [articleList]);

  useEffect(() => {
    if (requestError && requestError.response.status) {
      setConflict(true);
    }
  }, [requestError]);

  const url = topic.toLowerCase();

  return (
    <div className="room-container-wrapper">
      <div className="room-container">
        <CustomColorButton
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
        {curList.length ? (
          <RoomList roomList={curList} />
        ) : (
          <span className="loading-icon">방이 존재하지 않습니다</span>
        )}
      </div>
      <Link to={`/${url}/random`} className="change-matching">
        <div style={{ paddingBottom: '20px' }}>
          <CustomColorButton
            button={
              <Button
                style={{ color: 'white', fontFamily: 'ubuntu-medium' }}
                sx={{ mt: 2 }}
                fullWidth
                variant="contained"
              >
                <GiPerspectiveDiceSixFacesRandom
                  style={{ width: '30px', height: '30px' }}
                />
                Random Matching
              </Button>
            }
          />
        </div>
      </Link>
      <Snackbar
        open={conflict}
        autoHideDuration={2000}
        onClose={snackbarHandler}
      >
        <MuiAlert onClose={snackbarHandler} severity="error" variant="filled">
          이미 처리된 요청입니다.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default RoomContainer;
