import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentLIst = ({ commentList }) => {
  return (
    <div>
      {commentList.map((comment) => {
        return <CommentItem key={comment.opinionId} commentInfo={comment} />;
      })}
    </div>
  );
};

CommentLIst.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  commentList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentLIst;
