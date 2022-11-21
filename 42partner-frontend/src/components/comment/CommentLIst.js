import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import { deleteComment, editComment } from '../../modules/comments';

const CommentList = ({ articleId, commentList }) => {
  const dispatch = useDispatch();
  const { roomList } = useSelector(({ rooms }) => ({
    roomList: rooms.roomList,
  }));
  let anonymity = false;
  const onDelete = useCallback(
    (opinionId) => {
      dispatch(deleteComment({ opinionId }));
    },
    [dispatch],
  );

  const onEdit = (content, opinionId) => {
    dispatch(editComment({ content, opinionId }));
  };

  useEffect(() => {
    if (roomList.find((room) => room.articleId === articleId) !== undefined) {
      anonymity = true;
    }
  }, []);

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
          />
        );
      })}
    </div>
  );
};

// ts error, 해당사항없음
CommentList.propTypes = {
  articleId: PropTypes.string.isRequired,
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
