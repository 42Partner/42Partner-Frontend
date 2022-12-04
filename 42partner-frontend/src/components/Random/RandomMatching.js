import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';
import '../../styles/Matching.scss';
import LinearWithValueLabel from '../common/LinearWithValueLabel';
import { cancelRandomMatch, completeRandomMatch } from '../../modules/random';
import ConvertMap from '../common/ConvertMap';
import MatchingComplete from './MatchingComplete';

const RandomMatching = ({ topic }) => {
  const dispatch = useDispatch();

  const { data, match } = useSelector(({ random }) => ({
    data: random.options,
    match: random.match,
  }));

  const cancelHandler = () => {
    const contentCategory = topic;
    dispatch(cancelRandomMatch({ contentCategory }));
  };

  useEffect(() => {
    const contentCategory = topic;
    dispatch(completeRandomMatch({ contentCategory }));
  }, [match]);

  if (match) console.log(match);
  else console.log('111');

  return (
    <div>
      <div className="matching-wrapper">
        {!match ? (
          <div>
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
                      <span>
                        {data.matchConditionRandomMatchDto.placeList.map((el) =>
                          ConvertMap.get(el),
                        )}
                      </span>
                    </div>
                    <div className="matching-group">
                      <h3>학습 종류</h3>
                      <span>
                        {data.matchConditionRandomMatchDto.typeOfStudyList.map(
                          (el) => ConvertMap.get(el),
                        )}
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
        ) : (
          <MatchingComplete match={match} />
        )}
      </div>
    </div>
  );
};

export default RandomMatching;

RandomMatching.propTypes = {
  topic: PropTypes.string.isRequired,
};
