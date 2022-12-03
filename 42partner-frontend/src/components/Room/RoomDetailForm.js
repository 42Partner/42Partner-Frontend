import React, { useState, useEffect, useCallback } from 'react';
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
  loadArticleInfo,
  resetArticleData,
} from '../../modules/rooms';
import '../../styles/RoomDetailForm.scss';
import CustomColorButton from '../common/CustomColorButton';
import DialogContainer from '../common/DialogContainer';

const RoomDetailForm = ({ articleId, roomInfoPart, commetPart, onClose }) => {
  const dispatch = useDispatch();
  const { articleInfo, completeRoomList, userId } = useSelector(
    ({ rooms, login }) => ({
      articleInfo: rooms.articleInfo,
      completeRoomList: rooms.completeRoomList,
      userId: login.userId,
    }),
  );
  const [comfirmOpen, setComfirmOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [join, setJoin] = useState(false);

  const handleConfirmOpen = useCallback(() => {
    setComfirmOpen(true);
  });

  const handleConfirmClose = useCallback(
    (isDelete) => {
      if (!isDelete) {
        dispatch(deleteRoom({ articleId }));
        onClose();
      }
      setComfirmOpen(false);
    },
    [dispatch],
  );

  const completeRoomHandler = useCallback(() => {
    dispatch(completeRoom({ articleId }));
    setComplete(true);
  }, [dispatch]);

  const joinRoomHandler = useCallback(() => {
    setJoin(!join);
    if (join) {
      dispatch(cancleRoom({ articleId }));
    } else {
      dispatch(joinRoom({ articleId }));
    }
  }, [join, dispatch]);

  const isAlreadyJoin = useCallback(() => {
    if (
      articleInfo &&
      articleInfo.participantsOrAuthor.find((x) => x.isMe) !== undefined
    ) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, [articleInfo]);

  const isAleradyComplete = useCallback(() => {
    if (
      completeRoomList.find((room) => room.articleId === articleId) !==
      undefined
    ) {
      setComplete(true);
    }
  }, [completeRoomList]);

  useEffect(() => {
    dispatch(loadArticleInfo({ articleId }));
    isAlreadyJoin();
    isAleradyComplete();

    return () => {
      dispatch(resetArticleData());
    };
  }, []);

  useEffect(() => {
    isAlreadyJoin();
  }, [articleInfo]);

  return (
    <div>
      {articleInfo && (
        <div className="room-detail-form">
          <div className="close-button">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {roomInfoPart}
          <div className="paragraph button-wrapper">
            {articleInfo.userId === userId ? (
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
                    disabled={
                      articleInfo.participantNum ===
                        articleInfo.participantNumMax || complete
                    }
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
      )}
    </div>
  );
};

RoomDetailForm.propTypes = {
  roomInfoPart: PropTypes.element.isRequired,
  commetPart: PropTypes.element.isRequired,
  articleId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(RoomDetailForm);
