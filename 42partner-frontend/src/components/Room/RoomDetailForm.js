import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../../styles/RoomDetailForm.scss';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentLIst from '../comment/CommentLIst';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
  },
});

// eslint-disable-next-line no-unused-vars
const RoomDetailForm = ({ articleId, open, onClose }) => {
  const [commentList, setCommentList] = useState({ valueCount: 0, values: [] });
  const [comment, setComment] = useState('');

  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const setCommentListHandler = (valueCount, values) => {
    setCommentList({
      valueCount,
      values,
    });
  };

  const getCommentList = async () => {
    // `http://15.165.146.60:8080/api/articles/{articleId}/opinions`
    await axios
      .get(
        'https://fd1a4853-fb36-418a-bb00-5f83ada7f8b8.mock.pstmn.io/api/articles/asdfasdf/opinions',
      )
      .then((res) => {
        setCommentListHandler(res.data.valueCount, res.data.values);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCommentList();
  }, []);

  const addNewComment = async () => {
    const commentInfo = {
      articleId,
      content: comment,
      level: 1,
      parentId: '',
    };
    console.log(commentInfo);
    await axios
      .post(
        'https://fd1a4853-fb36-418a-bb00-5f83ada7f8b8.mock.pstmn.io/api/opinions',
        { commentInfo },
      )
      .then((res) => {
        console.log(res);
        getCommentList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="room-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <h1 className="paragraph">Title</h1>
      <h3>Intra_id (1200)</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="select-info-wrapper">
        <div>날짜 : 당일</div>
        <div>장소 : 개포</div>
        <div>시간대 : 점심 저녁</div>
        <div>배달여부 : 배달</div>
      </div>
      <p className="hashtag">#text1 #text #text #tadsfasdf</p>
      <div className="paragraph button-wrapper">
        <ThemeProvider theme={theme}>
          <Button className="join-button" variant="contained">
            참여
          </Button>
        </ThemeProvider>
      </div>
      <div className="comment-input-wrapper">
        <TextField
          sx={{ mb: 2, mt: 2 }}
          fullWidth
          placeholder="댓글 내용을 입력해 주세요"
          multiline
          inputProps={{ maxLength: 1000, minLength: 1 }}
          value={comment}
          onChange={commentInputHandler}
        />
        <ThemeProvider theme={theme}>
          <Button
            className="join-button"
            variant="contained"
            onClick={addNewComment}
          >
            입력
          </Button>
        </ThemeProvider>
      </div>
      {commentList.valueCount !== 0 && (
        <CommentLIst commentList={commentList.values} />
      )}
    </div>
  );
};

RoomDetailForm.propTypes = {
  articleId: PropTypes.string.isRequired,
  // createComment: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDetailForm;
