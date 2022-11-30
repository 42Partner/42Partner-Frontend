import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../modules/comments';
import NestedCommentItem from './NestedCommentItem';

const NestedComments = ({ parentId, anonymity }) => {
  const dispatch = useDispatch();
  const { commentList } = useSelector(({ comments }) => ({
    commentList: comments.commentList,
  }));
  const [nestedCommentList, setNestedCommentList] = useState([]);

  const getNestedComments = () => {
    const tmpList = commentList.filter(
      (comment) => comment.parentId === parentId,
    );
    const sortList = tmpList.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });

    setNestedCommentList(sortList);
  };

  useEffect(() => {
    getNestedComments();
  }, [commentList]);

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
      {nestedCommentList.length !== 0 && (
        <div className="nested-comment-wrapper">
          {nestedCommentList.map((comment) => {
            return (
              <NestedCommentItem
                anonymity={anonymity}
                key={comment.opinionId}
                commentInfo={comment}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
NestedComments.propTypes = {
  anonymity: PropTypes.bool.isRequired,
  parentId: PropTypes.string.isRequired,
};

export default NestedComments;
