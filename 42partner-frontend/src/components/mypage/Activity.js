import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Mypage.scss';

const Activity = () => {
  const scoreURL = `http://15.165.146.60:8080/api/activities/score`;
  const [score, setScore] = useState(0);
  useEffect(() => {
    const getScore = async () => {
      try {
        const activity = await axios.get(scoreURL);
        setScore(activity.score);
      } catch (e) {
        console.log(e);
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
