import React from 'react';
import MyPageTemplate from '../components/common/MyPageTemplate';
import HistroyList from '../components/history/HistroyList';

const MatchingHistoryPage = () => {
  return (
    <div>
      <MyPageTemplate>
        <HistroyList />
      </MyPageTemplate>
    </div>
  );
};

export default MatchingHistoryPage;
