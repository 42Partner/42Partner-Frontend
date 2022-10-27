import React from 'react';
import LunchPageTemplate from '../components/common/LunchPageTemplate';
import RoomList from '../components/Room/RoomList';

const RoomListPage = () => {
  return (
    <div>
      <LunchPageTemplate>
        <RoomList />
      </LunchPageTemplate>
    </div>
  );
};

export default RoomListPage;
