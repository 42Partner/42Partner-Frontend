import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CommentItem.scss';

const CommentItem = ({ commentInfo }) => {
  return (
    <div className="comment-item">
      <div className="comment-info">
        <h3>{commentInfo.nickname}</h3>
        <span>{commentInfo.createdAt}</span>
      </div>
      <div>{commentInfo.content}</div>
    </div>
  );
};

CommentItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  commentInfo: PropTypes.object.isRequired,
};

export default CommentItem;
