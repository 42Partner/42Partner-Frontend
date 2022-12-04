import React from 'react';
import { useSelector } from 'react-redux';

const History = () => {
  const { matchesNum } = useSelector(({ mypage }) => ({
    matchesNum: mypage.matchesNum,
  }));

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
