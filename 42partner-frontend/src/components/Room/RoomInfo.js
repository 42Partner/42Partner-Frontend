import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ConvertMap from '../common/ConvertMap';

const RoomInfo = () => {
  const { articleInfo } = useSelector(({ rooms }) => ({
    articleInfo: rooms.articleInfo,
  }));
  const { matchConditionDto } = articleInfo;
  const [author, setAuthor] = useState('');

  const makeKorean = (name, options) => {
    let res = '';

    for (let i = 0; i < options.length; ) {
      res += `${ConvertMap.get(options[i])} `;
      i += 1;
    }
    return res;
  };

  const findAuthor = () => {
    setAuthor(
      articleInfo.participantsOrAuthor.find((x) => x.isAuthor).nickname,
    );
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
      <h3>{articleInfo.anonymity ? '익명' : author}</h3>
      <p>{articleInfo.content}</p>
      <div className="select-info-wrapper">
        <div>날짜 : {articleInfo.isToday ? '당일' : articleInfo.date}</div>
        <div>장소 : {makeKorean('placeList', matchConditionDto.placeList)}</div>
        {articleInfo.contentCategory === 'MEAL' ? (
          <div>
            <div>
              시간대 :{' '}
              {makeKorean(
                'timeOfEatingList',
                matchConditionDto.timeOfEatingList,
              )}
            </div>
            <div>
              배달여부 :{' '}
              {makeKorean('wayOfEatingList', matchConditionDto.wayOfEatingList)}
            </div>
          </div>
        ) : (
          <div>
            주제 :{' '}
            {makeKorean('typeOfStudyList', matchConditionDto.typeOfStudyList)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomInfo;
