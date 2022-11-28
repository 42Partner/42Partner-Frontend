import React from 'react';
import PropTypes from 'prop-types';
import RoomItem from './RoomItem';
import { optionList } from '../utils';

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
    }),
  ).isRequired,
};

export default RoomList;
