import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/HistoryDetailForm.scss';
import ConvertMap from '../common/ConvertMap';

const HistoryDetailContent = ({ detail }) => {
  const mealOrStudy = ConvertMap.get(detail.contentCategory);
  const randomOrRoom = ConvertMap.get(detail.methodCategory);
  const place = detail.matchConditionDto.placeList.map((ele) =>
    ConvertMap.get(ele),
  );
  const timeToEat = detail.matchConditionDto.timeOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );
  const wayToEat = detail.matchConditionDto.wayOfEatingList.map((ele) =>
    ConvertMap.get(ele),
  );
  const typeToStudy = detail.matchConditionDto.typeOfStudyList.map((ele) =>
    ConvertMap.get(ele),
  );

  return (
    <div>
      <div className="paragraph">
        {ConvertMap.get()}
        <h2>
          [{mealOrStudy}] {randomOrRoom}
        </h2>
        {detail.participantsOrAuthor.MemberDto}
        {
          ('!!!',
          console.log(detail.participantsOrAuthor.map((e) => `${e.nickname} `)))
        }
        <h3>
          매칭 파트너 :{' '}
          {detail.participantsOrAuthor.map((e) => `${e.nickname} `)}
        </h3>
      </div>
      <div className="select-info-wrapper">
        {mealOrStudy === '밥트너' ? (
          <>
            <div>장소 : {place}</div>
            {randomOrRoom === '랜덤매칭' ? null : (
              <div>시간대 : {timeToEat}</div>
            )}
            <div>배달여부 : {wayToEat}</div>
            <h1>MEAL</h1>
          </>
        ) : (
          <>
            <div>장소 : {place} </div>
            <div>학습 종류 : {typeToStudy}</div>
            <h1>STUDY</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryDetailContent;

HistoryDetailContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  detail: PropTypes.object.isRequired,
};
