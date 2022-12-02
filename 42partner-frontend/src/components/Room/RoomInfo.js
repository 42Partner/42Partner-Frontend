import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { optionList } from '../utils';

const RoomInfo = () => {
  const { articleInfo } = useSelector(({ rooms }) => ({
    articleInfo: rooms.articleInfo,
  }));
  const { matchConditionDto } = articleInfo;
  const [author, setAuthor] = useState('');

  const makeKorean = (name, options) => {
    let res = '';

    for (let i = 0; i < options.length; ) {
      const element = options[i];
      res += `${optionList[name].find((op) => op.value === element).label} `;
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

// RoomInfo.propTypes = {
//   articleInfo: PropTypes.shape({
//     anonymity: PropTypes.bool,
//     articleId: PropTypes.string,
//     content: PropTypes.string,
//     contentCategory: PropTypes.string,
//     createdAt: PropTypes.string,
//     date: PropTypes.string,
//     isToday: PropTypes.bool,
//     // eslint-disable-next-line react/forbid-prop-types
//     matchConditionDto: PropTypes.object,
//     // eslint-disable-next-line react/forbid-prop-types
//     participantsOrAuthor: PropTypes.object,
//     nickname: PropTypes.string,
//     participantNum: PropTypes.number,
//     participantNumMax: PropTypes.number,
//     title: PropTypes.string,
//   }).isRequired,
// };

export default RoomInfo;
