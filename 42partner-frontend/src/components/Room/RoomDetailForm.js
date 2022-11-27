import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {
  cancleRoom,
  changeEditMode,
  completeRoom,
  deleteRoom,
  joinRoom,
} from '../../modules/rooms';
import '../../styles/RoomDetailForm.scss';
import CustomColorButton from '../common/CustomColorButton';
import DialogContainer from '../common/DialogContainer';

const RoomDetailForm = ({
  roomInfoPart,
  commetPart,
  articleId,
  ownerId,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { joinRoomList, userId } = useSelector(({ rooms, login }) => ({
    joinRoomList: rooms.joinRoomList,
    userId: login.userId,
  }));
  const [comfirmOpen, setComfirmOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [join, setJoin] = useState(false);

  const handleConfirmOpen = () => {
    setComfirmOpen(true);
  };

  const handleConfirmClose = (isDelete) => {
    if (isDelete) {
      dispatch(deleteRoom({ articleId }));
    }

    setComfirmOpen(false);
  };

  const completeRoomHandler = () => {
    dispatch(completeRoom({ articleId }));
    setComplete(true);
  };

  const joinRoomHandler = () => {
    setJoin(!join);
    if (join) {
      dispatch(cancleRoom({ articleId }));
    } else {
      dispatch(joinRoom({ articleId }));
    }
  };

  const isAlreadyJoin = () => {
    if (
      joinRoomList.find((room) => room.articleId === articleId) !== undefined
    ) {
      setJoin(true);
    }
  };

  useEffect(() => {
    isAlreadyJoin();
  }, []);


  return (
    <div className="room-detail-form">
      <div className="close-button">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {roomInfoPart}
      <div className="paragraph button-wrapper">
        {ownerId === userId ? (
          <div className="botton-group-wrapper">
            <CustomColorButton
              className="button"
              button={
                <Button
                  variant="contained"
                  disabled={complete}
                  onClick={completeRoomHandler}
                  color="complete"
                >
                  매칭 완료
                </Button>
              }
            />
            <div>
              <CustomColorButton
                className="button"
                button={
                  <Button
                    variant="contained"
                    onClick={() => dispatch(changeEditMode(true))}
                    disabled={complete}
                  >
                    수정
                  </Button>
                }
              />
              <Button
                style={{ background: '#cccccc', color: 'black' }}
                className="button"
                disabled={complete}
                variant="contained"
                onClick={handleConfirmOpen}
              >
                삭제
              </Button>
              <DialogContainer
                open={comfirmOpen}
                onClose={handleConfirmClose}
              />
            </div>
          </div>
        ) : (
          <CustomColorButton
            button={
              <Button
                className="button"
                variant="contained"
                onClick={joinRoomHandler}
                color={join ? 'cancle' : 'primary'}
              >
                {join ? '참여 취소' : '참여'}
              </Button>
            }
          />
        )}
      </div>
      {commetPart}
    </div>
  );
};

RoomDetailForm.propTypes = {
  roomInfoPart: PropTypes.element.isRequired,
  commetPart: PropTypes.element.isRequired,
  articleId: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDetailForm;
