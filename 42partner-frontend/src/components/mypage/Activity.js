import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../../styles/Mypage.scss';

const Activity = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const getScore = async () => {
      try {
        // const activity = await axios.get(
        //   `${process.env.REACT_APP_API_KEY}/activities/score`,
        // );
        // setScore(activity.score);

        setScore(10);
      } catch (e) {
        Promise.reject(e);
      }
    };

    getScore();
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
