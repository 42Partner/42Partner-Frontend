import React from 'react';
import PropTypes from 'prop-types';

const optionList = {
  placeList: [
    { value: 'SEOCHO', label: '개포' },
    { value: 'GAEPO', label: '서초' },
    { value: 'OUT_OF_CLUSTER', label: '기타 (외부)' },
  ],
  timeOfEatingList: [
    { value: 'BREAKFAST', label: '아침' },
    { value: 'LUNCH', label: '점심' },
    { value: 'DUNCH', label: '점저' },
    { value: 'DINNER', label: '저녁' },
    { value: 'MIDNIGHT', label: '야식' },
  ],
  typeOfStudyList: [
    { value: 'INNER_CIRCLE', label: '본 과정' },
    { value: 'NOT_INNER_CIRCLE', label: '비 본 과정' },
  ],
  wayOfEatingList: [
    { value: 'DELIVERY', label: '배달' },
    { value: 'EATOUT', label: '도보' },
    { value: 'TAKEOUT', label: '기타' },
  ],
};

const RoomInfo = ({ articleInfo }) => {
  const { matchConditionDto } = articleInfo;

  const makeKorean = (name, options) => {
    let res = '';

    for (let i = 0; i < options.length; ) {
      const element = options[i];
      res += `${optionList[name].find((op) => op.value === element).label} `;
      i += 1;
    }
    return res;
  };

  return (
    <div>
      <h1 className="paragraph">{articleInfo.title}</h1>
      <h3>{articleInfo.anonymity ? '익명' : articleInfo.nickname}</h3>
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

RoomInfo.propTypes = {
  articleInfo: PropTypes.shape({
    anonymity: PropTypes.bool,
    articleId: PropTypes.string,
    content: PropTypes.string,
    contentCategory: PropTypes.string,
    createdAt: PropTypes.string,
    date: PropTypes.string,
    isToday: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    matchConditionDto: PropTypes.object,
    // (
    //   PropTypes.shape({
    //     placeList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    //     timeOfEatingList: PropTypes.arrayOf(PropTypes.string),
    //     typeOfStudyList: PropTypes.arrayOf(PropTypes.string),
    //     wayOfEatingList: PropTypes.arrayOf(PropTypes.string),
    //   }),
    // ),
    nickname: PropTypes.string,
    participantNum: PropTypes.number,
    participantNumMax: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default RoomInfo;
