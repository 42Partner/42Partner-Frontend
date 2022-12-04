import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loadCommentList, createComment } from '../../modules/comments';
import CommentList from './CommentList';
import CustomColorButton from '../common/CustomColorButton';

const CommentPart = ({ anonymity, articleId }) => {
  const dispatch = useDispatch();
  const { commentsList } = useSelector(({ comments }) => ({
    commentsList: comments.commentList,
  }));
  const [comment, setComment] = useState('');
  const [oneLevelCommetList, setOneLevelCommetList] = useState([]);

  const getCommentList = useCallback(() => {
    dispatch(loadCommentList({ articleId }));
  });

  const commentInputHandler = useCallback((e) => {
    setComment(e.target.value);
  }, []);

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
  }, [comment]);

  useEffect(() => {
    getCommentList();
  }, []);

  useEffect(() => {
    if (commentsList) {
      const tmpList = commentsList.filter((c) => c.level === 1);
      const sortList = tmpList.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });

      setOneLevelCommetList(sortList);
    }
  }, [commentsList]);

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
        <CustomColorButton
          button={
            <Button
              className="button"
              variant="contained"
              onClick={addNewComment}
            >
              입력
            </Button>
          }
        />
      </div>
      {(commentsList !== undefined || commentsList !== null) && (
        <CommentList
          anonymity={anonymity}
          articleId={articleId}
          commentList={oneLevelCommetList}
        />
      )}
    </div>
  );
};

CommentPart.propTypes = {
  anonymity: PropTypes.bool.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default React.memo(CommentPart);
