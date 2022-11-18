import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { deleteRoom } from '../../modules/rooms';
import '../../styles/RoomDetailForm.scss';
import RoomInfo from './RoomInfo';
import CommentPart from '../comment/CommentPart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
  },
});

const RoomDetailForm = ({
  articleInfo,
  hashtag,
  onClose,
  editMode,
  onEditMode,
}) => {
  const dispatch = useDispatch();
  const { articleId } = articleInfo;
  const [myArticle, setMyArticle] = useState(false);
  const [comfirmOpen, setComfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setComfirmOpen(true);
  };

  const handleConfirmClose = (isDelete) => {
    if (isDelete) {
      dispatch(deleteRoom({ articleId }));
    }

    setComfirmOpen(false);
  };

  useEffect(() => {
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
      <RoomInfo articleInfo={articleInfo} />
      <p className="hashtag">{hashtag}</p>
      <div className="paragraph button-wrapper">
        {myArticle ? (
          <div className="botton-group-wrapper">
            <ThemeProvider theme={theme}>
              <Button className="button" variant="contained">
                매칭 완료
              </Button>
            </ThemeProvider>
            <div>
              <ThemeProvider theme={theme}>
                <Button
                  className="button"
                  variant="contained"
                  editMode={editMode}
                  onClick={() => onEditMode(true)}
                >
                  수정
                </Button>
              </ThemeProvider>
              <Button
                style={{ background: '#cccccc', color: 'black' }}
                className="button"
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
            <Button className="join-button" variant="contained">
              참여
            </Button>
          </ThemeProvider>
        )}
      </div>
      <CommentPart articleId={articleId} />
    </div>
  );
};

RoomDetailForm.propTypes = {
  articleInfo: PropTypes.shape({
    anonymity: PropTypes.bool,
    articleId: PropTypes.string,
    content: PropTypes.string,
    contentCategory: PropTypes.string,
    createdAt: PropTypes.string,
    date: PropTypes.string,
    isToday: PropTypes.bool,
    matchConditionDto: PropTypes.objectOf(
      PropTypes.shape({
        placeList: PropTypes.arrayOf(PropTypes.string),
        timeOfEatingList: PropTypes.arrayOf(PropTypes.string),
        typeOfStudyList: PropTypes.arrayOf(PropTypes.string),
        wayOfEatingList: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    nickname: PropTypes.string,
    participantNum: PropTypes.number,
    participantNumMax: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  hashtag: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  onEditMode: PropTypes.func.isRequired,
};

export default RoomDetailForm;
