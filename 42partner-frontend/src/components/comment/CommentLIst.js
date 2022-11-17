import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CommentItem from './CommentItem';
import { deleteComment, editComment } from '../../modules/comments';

const CommentLIst = ({ commentList }) => {
  const dispatch = useDispatch();

  const onDelete = useCallback(
    (opinionId) => {
      dispatch(deleteComment({ opinionId }));
    },
    [dispatch],
  );

  const onEdit = (content, opinionId) => {
    dispatch(editComment({ content, opinionId }));
  };

  return (
    <div>
      {commentList.map((comment) => {
        return (
          <CommentItem
            key={comment.opinionId}
            commentInfo={comment}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
};

CommentLIst.propTypes = {
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string,
      level: PropTypes.number,
      nickname: PropTypes.string,
      opinionId: PropTypes.string,
      parentId: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
};

export default React.memo(CommentLIst);
