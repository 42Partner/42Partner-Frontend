import React from 'react';
import '../../styles/CommentItem.scss';

const CommentItem = () => {
  return (
    <div className="comment-item">
      <div className="comment-info">
        <h3>Intra_id (1200)</h3>
        <span>nn:nn</span>
      </div>
      <div>comment</div>
    </div>
  );
};

export default CommentItem;
