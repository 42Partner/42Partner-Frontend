import React from 'react';
import Activity from '../components/mypage/Activity';
import History from '../components/mypage/History';
import Profile from '../components/mypage/Profile';
import MatchingHistory from '../components/mypage/MatchingHistory';
import '../styles/Mypage.scss';

const MyPage = () => {
  return (
    <div>
      <div className="mypage-wrapper">
        <Profile />
        <Activity />
        <History />
      </div>
      <h1>Matching History</h1>
      <MatchingHistory />
    </div>
  );
};

export default MyPage;
