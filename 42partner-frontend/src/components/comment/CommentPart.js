import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loadCommentList, createComment } from '../../modules/comments';
import CommentList from './CommentList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
  },
});

const CommentPart = ({ articleId }) => {
  const dispatch = useDispatch();
  const { commentList, commetLoading } = useSelector(
    ({ comments, loading }) => ({
      commentList: comments.commentList,
      commetLoading: loading['comment/LOADLIST'],
    }),
  );
  const [comment, setComment] = useState('');

  const getCommentList = useCallback(() => {
    dispatch(loadCommentList({ articleId }));
  });

  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const addNewComment = () => {
    if (comment.length < 1) return;

    const commentInfo = {
      articleId,
      content: comment,
      level: 1,
      parentId: '',
    };
    dispatch(createComment({ commentInfo }));
    setComment('');
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div>
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
            className="button"
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
      {(commentList !== undefined || commentList !== null) && (
        <CommentList articleId={articleId} commentList={commentList} />
      )}
    </div>
  );
};

CommentPart.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default CommentPart;
