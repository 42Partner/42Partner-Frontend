import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import GroupsIcon from '@mui/icons-material/Groups';
import ConvertMap from '../common/ConvertMap';

const RoomInfo = () => {
  const { articleInfo } = useSelector(({ rooms }) => ({
    articleInfo: rooms.articleInfo,
  }));
  const { matchConditionDto } = articleInfo;
  const [author, setAuthor] = useState('');

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

  useEffect(() => {
    findAuthor();
    return () => {
      setAuthor('');
    };
  }, []);

  return (
    <div>
      <h1 className="paragraph">{articleInfo.title}</h1>
      <span className="author-participant-info">
        <h3>{articleInfo.anonymity ? '익명' : author}</h3>
        <span className="people-count">
          <GroupsIcon />
          <h3>
            {articleInfo.participantNum}/{articleInfo.participantNumMax}
          </h3>
        </span>
      </span>
      <p>{articleInfo.content}</p>
      <div className="select-info-wrapper">
        <div>날짜 : {articleInfo.isToday ? '당일' : articleInfo.date}</div>
        <div>장소 : {makeKorean(matchConditionDto.placeList)}</div>
        {articleInfo.contentCategory === 'MEAL' ? (
          <div>
            <div>시간대 : {makeKorean(matchConditionDto.timeOfEatingList)}</div>
            <div>
              배달여부 : {makeKorean(matchConditionDto.wayOfEatingList)}
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
