import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import ConvertMap from '../common/ConvertMap';
import ModalTemplate from '../common/ModalTemplate';
import ParticipantList from './ParticipantList';

const RoomInfo = () => {
  const { articleInfo } = useSelector(({ rooms }) => ({
    articleInfo: rooms.articleInfo,
  }));
  const { matchConditionDto } = articleInfo;
  const [author, setAuthor] = useState('');
  const [show, setShow] = useState(false);

  const makeKorean = useCallback((options) => {
    let res = '';

    for (let i = 0; i < options.length; ) {
      res += `${ConvertMap.get(options[i])} `;
      i += 1;
    }
    return res;
  }, []);

  const findAuthor = useCallback(() => {
    setAuthor(
      articleInfo.participantsOrAuthor.find((x) => x.isAuthor).nickname,
    );
  }, []);

  const participantListHandler = () => {
    setShow(!show);
  };

  useEffect(() => {
    findAuthor();
    return () => {
      setAuthor('');
    };
  }, []);

  useEffect(() => {
    findAuthor();
  }, [articleInfo]);

  return (
    <div>
      <h1 className="paragraph">{articleInfo.title}</h1>
      <div className="people-info">
        <h3>{articleInfo.anonymity ? '익명' : author}</h3>
        <span className="people-count">
          <IconButton size="small" onClick={participantListHandler}>
            <GroupsIcon />
            <span>
              {articleInfo.participantNum}/{articleInfo.participantNumMax}
            </span>
            <ModalTemplate open={show} onClose={participantListHandler}>
              <ParticipantList
                memberList={articleInfo.participantsOrAuthor}
                onClose={participantListHandler}
              />
            </ModalTemplate>
          </IconButton>
        </span>
      </div>
      <p>{articleInfo.content}</p>
      <div className="select-info-wrapper">
        <div>모임 일자 : {articleInfo.isToday ? '당일' : articleInfo.date}</div>
        <div>장소 : {makeKorean(matchConditionDto.placeList)}</div>
        {articleInfo.contentCategory === 'MEAL' ? (
          <div>
            <div>시간대 : {makeKorean(matchConditionDto.timeOfEatingList)}</div>
            <div>
              식사 방식 : {makeKorean(matchConditionDto.wayOfEatingList)}
            </div>
          </div>
        ) : (
          <div>주제 : {makeKorean(matchConditionDto.typeOfStudyList)}</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RoomInfo);
