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

/*
anonymity
: 
true
articleId
: 
"21ce5893-8c0f-4b5c-9c46-5ccea3ffea69"
content
: 
"서초 클러스터 2시에 치킨 먹으러갈겁니다."
contentCategory
: 
"MEAL"
createdAt
: 
"2022-11-16T17:09:58.867621"
date
: 
"2022-10-03"
isToday
: 
false
matchConditionDto
: 
{placeList: Array(1), timeOfEatingList: Array(0), wayOfEatingList: Array(0), typeOfStudyList: Array(0)}
nickname
: 
"takim"
participantNum
: 
1
participantNumMax
: 
5
title
: 
"개포에서 2시에 점심 먹으실 분 구합니다."
*/
