import React from 'react';
import Activity from '../components/mypage/Activity';
import History from '../components/mypage/History';
import Profile from '../components/mypage/Profile';
import MatchingHistory from '../components/mypage/MatchingHistory';
import '../styles/Mypage.scss';

const MyPage = () => {
  return (
    <div className="mypage-div">
      <h1>User Info.</h1>
      <div className="mypage-wrapper">
        <Profile />
        <Activity />
        <History />
      </div>
      <div>
        <h1>Matching History</h1>
        <MatchingHistory />
      </div>
    </div>
  );
};

export default MyPage;
