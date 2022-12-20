import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles/ParticipantList.scss';

const ParticipantList = ({ memberList, onClose }) => {
  return (
    <div className="participantList-wrapper">
      <div className="close-button">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <h3>참여자 목록</h3>
      {memberList.map((m) => {
        return (
          <div
            key={m.nickname}
            // eslint-disable-next-line no-nested-ternary
            className={m.isAuthor ? 'author' : m.isMe ? 'me' : 'none'}
          >
            {m.nickname} {m.isAuthor && '(owner)'} {m.isMe && '(me)'}
          </div>
        );
      })}
    </div>
  );
};

ParticipantList.propTypes = {
  memberList: PropTypes.arrayOf(
    PropTypes.shape({
      isAuthor: PropTypes.bool,
      isMe: PropTypes.bool,
      nickname: PropTypes.string,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ParticipantList;
