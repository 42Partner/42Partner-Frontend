import React from 'react';
import LunchPageTemplate from '../components/LunchPageTemplate';
import RoomList from '../components/RoomList';

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
