import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from '../../modules/mypage';

// import axios from 'axios';

const History = () => {
  const dispatch = useDispatch();
  const { matchesNum } = useSelector(({ mypage }) => ({
    matchesNum: mypage.matchesNum,
  }));
  console.log('1111', matchesNum);
  useEffect(() => {
    dispatch(getMatches());
  }, []);

  return (
    <div className="card profile-header">
      <div className="body">
        <div className="score-description" style={{ textAlign: 'center' }}>
          <h2>매칭 횟수</h2>
          <span
            style={{
              fontSize: '40px',
              color: 'lightpink',
            }}
          >
            {matchesNum}
          </span>
        </div>
      </div>
    </div>
  );
};

export default History;
