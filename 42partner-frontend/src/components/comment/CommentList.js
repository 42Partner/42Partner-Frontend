import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CommentItem from './CommentItem';
import { deleteComment, editComment } from '../../modules/comments';

const CommentList = ({ articleId, anonymity, commentList }) => {
  const dispatch = useDispatch();

  const onDelete = useCallback(
    (opinionId) => {
      dispatch(deleteComment({ opinionId }));
    },
    [dispatch],
  );

  const onEdit = useCallback(
    (content, opinionId) => {
      dispatch(editComment({ content, opinionId }));
    },
    [dispatch],
  );

  return (
    <div>
      {commentList.map((comment) => {
        return (
          <CommentItem
            anonymity={anonymity}
            key={comment.opinionId}
            commentInfo={comment}
            onDelete={onDelete}
            onEdit={onEdit}
            articleId={articleId}
          />
        );
      })}
    </div>
  );
};

CommentList.propTypes = {
  articleId: PropTypes.string.isRequired,
  anonymity: PropTypes.bool.isRequired,
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

export default React.memo(CommentList);
