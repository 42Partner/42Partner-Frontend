/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../../styles/RoomItem.scss';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';
import ConvertMap from '../common/ConvertMap';

const RoomItem = ({
  date,
  anonymity,
  nickname,
  title,
  content,
  participantNum,
  participantNumMax,
  isToday,
  contentCategory,
  matchConditionDto,
}) => {
  const [open, setOpen] = useState(false);
  //   const [roomData, setRoomData] = useState({});

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  const convertedDate = date.substr(0, 10);
  const convertedContent = ConvertMap.get(contentCategory);
  const convertedPlaceList = matchConditionDto.placeList.map((ele) =>
    ConvertMap.get(ele),
  );
  const convertedTimeOfEat = matchConditionDto.timeOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );
  const convertedTypeOfStudy = matchConditionDto.typeOfStudyList.map((ele) =>
    ConvertMap.get(ele),
  );
  const convertedWayOfEat = matchConditionDto.wayOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );

  return (
    <div className="room-item">
      <div className="sort-edge">
        <span className="title-text">
          [ {convertedContent} ] {title}
        </span>
        <span className="people-count">
          <GroupsIcon />
          <span>
            {participantNum}/{participantNumMax}
          </span>
        </span>
      </div>
      <div className="sort-edge">
        <p className="hashtag">
          {isToday === true ? '#오늘 ' : null}
          {/* {`#${convertedContent} `} */}
          {`#${convertedPlaceList} `}
          {convertedTimeOfEat.length === 0 ? null : `#${convertedTimeOfEat} `}
          {convertedTypeOfStudy.length === 0
            ? null
            : `#${convertedTypeOfStudy} `}
          {convertedWayOfEat.length === 0 ? null : `#${convertedWayOfEat} `}
          {anonymity === false ? `#방장${nickname} ` : '#익명방 '}
        </p>
        <div>
          <Button
            style={{
              background: '#cccccc',
              color: 'black',
              backgroundColor: 'lightPink',
            }}
            id="button"
            variant="contained"
            onClick={handleWriteOpen}
          >
            상세
          </Button>
          <ModalTemplate open={open} onClose={handleWriteClose}>
            <RoomDetailForm
              open={open}
              onClose={handleWriteClose}
              title={title}
              content={content}
              anonymity={anonymity}
              nickname={nickname}
              participantNum={participantNum}
              participantNumMax={participantNumMax}
              isToday={isToday}
              date={convertedDate}
              contentCategory={convertedContent}
              place={convertedPlaceList}
              timeOfEat={convertedTimeOfEat}
              typeOfStudy={convertedTypeOfStudy}
              wayOfEat={convertedWayOfEat}
            />
          </ModalTemplate>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
