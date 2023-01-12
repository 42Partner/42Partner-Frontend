import React from 'react';
import Activity from './Activity';
import History from './History';
import MatchingHistory from './MatchingHistory';
import Profile from './Profile';
import '../../styles/Mypage.scss';

const MypageContainer = (flag) => {
  return (
    <div className="mypage-div">
      <h1>User Info.</h1>
      <div className="mypage-wrapper">
        <Profile flag={flag} />
        <div className="activity-wrapper">
          <Activity />
          <History />
        </div>
      </div>
      <div>
        <h1>Matching History</h1>
        <MatchingHistory />
      </div>
    </div>
  );
};

export default MypageContainer;
