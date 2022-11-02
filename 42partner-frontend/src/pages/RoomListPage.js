import React from 'react';
import MealPageTemplate from '../components/common/MealPageTemplate';
import RoomList from '../components/Room/RoomList';

const RoomListPage = () => {
  return (
    <div>
      <MealPageTemplate>
        <RoomList />
      </MealPageTemplate>
    </div>
  );
};

export default RoomListPage;
