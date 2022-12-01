import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { createComment } from '../../modules/comments';

const CreateReply = ({ parentId, handleNestedComment, articleId }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');

  const handleNewInput = useCallback((e) => {
    setReply(e.target.value);
  }, []);

  const createReply = useCallback(() => {
    if (reply.length < 1) return;

    const commentInfo = {
      articleId,
      content: reply,
      level: 2,
      parentId,
    };

    dispatch(createComment({ commentInfo }));
    setReply('');

    handleNestedComment();
  }, [reply]);

  return (
    <div className="reply-input">
      <div className="editmode">
        <TextField
          fullWidth
          placeholder="답글을 입력해 주세요."
          variant="standard"
          onChange={handleNewInput}
          value={reply}
        />
        <IconButton size="small" onClick={createReply}>
          <DoneIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleNestedComment}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

CreateReply.propTypes = {
  parentId: PropTypes.string.isRequired,
  handleNestedComment: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default React.memo(CreateReply);
