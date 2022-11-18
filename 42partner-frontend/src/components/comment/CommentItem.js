import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import '../../styles/CommentItem.scss';

const CommentItem = ({ commentInfo, anonymity, onDelete, onEdit }) => {
  const { content, createdAt, updatedAt, nickname } = commentInfo;
  const [comfirmOpen, setComfirmOpen] = useState(false);
  const [newContent, setNewContent] = useState(commentInfo.content);
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setNewContent(content);
    setEditMode(!editMode);
  };

  const handleNewContent = (e) => {
    setNewContent(e.target.value);
  };

  const handleConfirmOpen = () => {
    setComfirmOpen(true);
  };

  const handleConfirmClose = (isDelete) => {
    if (isDelete) {
      onDelete(commentInfo.opinionId);
    }

    setComfirmOpen(false);
  };

  const changeDateFormat = (date) => {
    return date.substr(0, 10);
  };

  const editComment = () => {
    if (newContent !== content) {
      onEdit(newContent, commentInfo.opinionId);
    }

    handleEditMode();
  };

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
          <IconButton size="small" onClick={handleEditMode}>
            <CreateOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
        <IconButton size="small" onClick={handleConfirmOpen}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={comfirmOpen}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              댓글을 삭제 하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmClose(false)}>취소</Button>
            <Button onClick={() => handleConfirmClose(true)} autoFocus>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
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

CommentItem.propTypes = {
  commentInfo: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    level: PropTypes.number,
    nickname: PropTypes.string,
    opinionId: PropTypes.string,
    parentId: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  anonymity: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(CommentItem);
