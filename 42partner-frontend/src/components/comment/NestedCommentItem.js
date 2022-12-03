import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import '../../styles/CommentItem.scss';
import DialogContainer from '../common/DialogContainer';

const NestedCommentItem = ({ commentInfo, anonymity, onDelete, onEdit }) => {
  const { content, createdAt, updatedAt, nickname } = commentInfo;
  const { userId } = useSelector(({ login }) => ({
    userId: login.userId,
  }));
  const [comfirmOpen, setComfirmOpen] = useState(false);
  const [newContent, setNewContent] = useState(commentInfo.content);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = useCallback(() => {
    setNewContent(content);
    setEditMode(!editMode);
  }, [editMode]);

  const handleNewContent = useCallback((e) => {
    setNewContent(e.target.value);
  }, []);

  const handleConfirmOpen = useCallback(() => {
    setComfirmOpen(true);
  }, []);

  const handleConfirmClose = useCallback((isDelete) => {
    if (!isDelete) {
      onDelete(commentInfo.opinionId);
    }

    setComfirmOpen(false);
  }, []);

  const changeDateFormat = useCallback((date) => {
    return date.substr(0, 10);
  }, []);

  const editComment = useCallback(() => {
    if (newContent !== content) {
      onEdit(newContent, commentInfo.opinionId);
    }

    handleEditMode();
  }, [newContent]);

  return (
    <div className="comment-item">
      <div className="comment-info">
        <span>
          <h3>{anonymity ? '익명' : nickname}</h3>
          {createdAt === updatedAt ? (
            <span>{changeDateFormat(createdAt)}</span>
          ) : (
            <span>{changeDateFormat(updatedAt)} (수정됨)</span>
          )}
          {commentInfo.userId === userId && (
            <IconButton size="small" onClick={handleEditMode}>
              <CreateOutlinedIcon fontSize="small" />
            </IconButton>
          )}
        </span>
        {commentInfo.userId === userId && (
          <IconButton size="small" onClick={handleConfirmOpen}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <DialogContainer open={comfirmOpen} onClose={handleConfirmClose} />
      </div>
      {editMode ? (
        <div className="editmode">
          <TextField
            fullWidth
            variant="standard"
            onChange={handleNewContent}
            value={newContent}
          />
          <IconButton size="small" onClick={editComment}>
            <DoneIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleEditMode}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};

NestedCommentItem.propTypes = {
  commentInfo: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    level: PropTypes.number,
    nickname: PropTypes.string,
    opinionId: PropTypes.string,
    parentId: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  anonymity: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(NestedCommentItem);
