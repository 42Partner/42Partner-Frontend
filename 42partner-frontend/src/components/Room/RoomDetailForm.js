import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
import CommentPart from '../comment/CommentPart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
    cancle: {
      main: '#b5d7f5',
    },
  },
});

const RoomDetailForm = ({ roomInfoPart, articleId, onClose }) => {
  const dispatch = useDispatch();
  const { joinRoomList } = useSelector(({ rooms }) => ({
    joinRoomList: rooms.joinRoomList,
  }));
  const [myArticle, setMyArticle] = useState(false);
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
    // if ( userId === sessionId) {
    setMyArticle(true);
    // }
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
        {myArticle ? (
          <div className="botton-group-wrapper">
            <ThemeProvider theme={theme}>
              <Button
                className="button"
                variant="contained"
                disabled={complete}
                onClick={completeRoomHandler}
              >
                매칭 완료
              </Button>
            </ThemeProvider>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  className="button"
                  variant="contained"
                  onClick={() => dispatch(changeEditMode(true))}
                  disabled={complete}
                >
                  수정
                </Button>
              </ThemeProvider>
              <Button
                style={{ background: '#cccccc', color: 'black' }}
                className="button"
                disabled={complete}
                variant="contained"
                onClick={handleConfirmOpen}
              >
                삭제
              </Button>
              <Dialog
                open={comfirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    삭제 하시겠습니까?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleConfirmClose(false)}>
                    취소
                  </Button>
                  <Button onClick={() => handleConfirmClose(true)} autoFocus>
                    삭제
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        ) : (
          <ThemeProvider theme={theme}>
            <Button
              className="button"
              variant="contained"
              onClick={joinRoomHandler}
              color={join ? 'cancle' : 'primary'}
            >
              {join ? '참여 취소' : '참여'}
            </Button>
          </ThemeProvider>
        )}
      </div>
      <CommentPart articleId={articleId} />
    </div>
  );
};

RoomDetailForm.propTypes = {
  roomInfoPart: PropTypes.element.isRequired,
  articleId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDetailForm;
