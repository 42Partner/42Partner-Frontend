import React, { useState, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../../styles/RoomDetailForm.scss';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CommentLIst from '../comment/CommentLIst';
import {
  loadCommentList,
  createComment,
  setArticleId,
  resetData,
} from '../../modules/comments';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
  },
});

const RoomDetailForm = ({ articleId, open, onClose }) => {
  const dispatch = useDispatch();
  const { allComment, commetLoading } = useSelector(
    ({ comments, loading }) => ({
      allComment: comments.allComment,
      commetLoading: loading['comment/LOADLIST'],
    }),
  );
  const [commentList, setCommentList] = useState({ valueCount: 0, values: [] });
  const [comment, setComment] = useState('');

  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const setCommentListHandler = () => {
    if (allComment === null) return;

    setCommentList({
      valueCount: allComment.valueCount,
      values: allComment.values,
    });
  };

  const getCommentList = useCallback(() => {
    dispatch(loadCommentList({ articleId }));
    setCommentListHandler();
  });

  const addNewComment = useCallback(() => {
    if (comment.length < 1) return;

    const commentInfo = {
      articleId,
      content: comment,
      level: 1,
      parentId: '',
    };
    dispatch(createComment({ commentInfo }));
    setComment('');
  });

  useEffect(() => {
    dispatch(setArticleId(articleId));
    getCommentList();
  }, []);

  useEffect(() => {
    setCommentListHandler();
    return () => {
      dispatch(resetData());
    };
  }, [allComment]);

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
      {commetLoading && (
        <div className="loading-icon">
          <ThemeProvider theme={theme}>
            <CircularProgress />
          </ThemeProvider>
        </div>
      )}
      {commentList.values !== undefined && (
        <CommentLIst commentList={commentList.values} />
      )}
    </div>
  );
};

RoomDetailForm.propTypes = {
  articleId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RoomDetailForm;
