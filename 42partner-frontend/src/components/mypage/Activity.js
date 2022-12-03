import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScore } from '../../modules/mypage';
// import axios from 'axios';

const Activity = () => {
  const dispatch = useDispatch();
  const { score } = useSelector(({ mypage }) => ({
    score: mypage.score,
  }));
  useEffect(() => {
    dispatch(getScore());
  }, []);

  return (
    <div className="card profile-header">
      <div className="body">
        <div className="score-description" style={{ textAlign: 'center' }}>
          <h2>활동 점수</h2>
          <span
            style={{
              fontSize: '40px',
              color: 'lightpink',
            }}
          >
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Activity;
