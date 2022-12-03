import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';
import '../../styles/Matching.scss';
import LinearWithValueLabel from '../common/LinearWithValueLabel';
import { cancelRandomMatch, getRandomMatch } from '../../modules/random';
import ConvertMap from '../common/ConvertMap';
// import ConvertMap from '../common/ConvertMap';

const RandomMatching = ({ topic, flip }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    contentCategory: null,
  });

  const { data } = useSelector(({ random }) => ({
    data: random.data,
  }));
  console.log(data);

  useEffect(() => {
    setCategory({
      contentCategory: `${topic}`,
    });
    const url = topic.toLowerCase();
    dispatch(getRandomMatch({ url }));
    console.log(url);
  }, []);

  const cancelHandler = (e) => {
    dispatch(cancelRandomMatch({ category }));
    flip(e);
  };

  return (
    <div>
      <div className="matching-wrapper">
        <h3 className="matching-description" style={{ color: '#0099a4' }}>
          매칭 진행 중
        </h3>
        {topic === 'MEAL'
          ? data && (
              <div className="matching-field">
                <div className="matching-group">
                  <h3>장소</h3>
                  <span>
                    {data.matchConditionRandomMatchDto.placeList.map((el) =>
                      ConvertMap.get(el),
                    )}
                  </span>
                </div>
                <div className="matching-group">
                  <h3>식사 방식</h3>
                  <span>
                    {data.matchConditionRandomMatchDto.wayOfEatingList.map(
                      (el) => ConvertMap.get(el),
                    )}
                  </span>
                </div>
              </div>
            )
          : data && (
              <div className="matching-field">
                <div className="matching-group">
                  <h3>장소</h3>
                  <span>{data.matchConditionRandomMatchDto.placeList}</span>
                </div>
                <div className="matching-group">
                  <h3>학습 종류</h3>
                  <span>
                    {data.matchConditionRandomMatchDto.typeOfStudyList}
                  </span>
                </div>
              </div>
            )}

        <div className="matching-progress">
          <LinearWithValueLabel />
        </div>
        <div className="matching-btn">
          <Button
            onClick={cancelHandler}
            style={{ backgroundColor: '#0099a4' }}
          >
            매칭 취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomMatching;

RandomMatching.propTypes = {
  topic: PropTypes.string.isRequired,
  flip: PropTypes.func.isRequired,
};
