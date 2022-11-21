import React from 'react';
import PropTypes from 'prop-types';
import RoomItem from './RoomItem';
import '../../styles/RoomList.scss';

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

const RoomList = ({ roomList }) => {
  const makeHashTag = (articleInfo) => {
    const res = [`#${articleInfo.date.slice(5).replace('-', '/')} `];
    const { matchConditionDto } = articleInfo;

    for (let i = 0; i < Object.keys(matchConditionDto).length; ) {
      const name = Object.keys(matchConditionDto)[i];
      for (let j = 0; j < matchConditionDto[name].length; ) {
        const element = matchConditionDto[name][j];
        res.push(
          `#${optionList[name].find((op) => op.value === element).label} `,
        );
        j += 1;
      }
      i += 1;
    }

    return res;
  };

  return (
    <div className="room-list">
      {roomList.map((article) => {
        return (
          <RoomItem
            key={article.articleId}
            articleInfo={article}
            hashtag={makeHashTag(article)}
          />
        );
      })}
    </div>
  );
};

RoomList.propTypes = {
  roomList: PropTypes.arrayOf(
    PropTypes.shape({
      anonymity: PropTypes.bool,
      articleId: PropTypes.string,
      content: PropTypes.string,
      contentCategory: PropTypes.string,
      createdAt: PropTypes.string,
      date: PropTypes.string,
      isToday: PropTypes.bool,
      matchConditionDto: PropTypes.objectOf(
        PropTypes.shape({
          placeList: PropTypes.arrayOf(PropTypes.string),
          timeOfEatingList: PropTypes.arrayOf(PropTypes.string),
          typeOfStudyList: PropTypes.arrayOf(PropTypes.string),
          wayOfEatingList: PropTypes.arrayOf(PropTypes.string),
        }),
      ),
      nickname: PropTypes.string,
      participantNum: PropTypes.number,
      participantNumMax: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default RoomList;
