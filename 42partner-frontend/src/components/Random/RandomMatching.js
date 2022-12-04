import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';
import '../../styles/Matching.scss';
import { cancelRandomMatch } from '../../modules/random';
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
            {/* <div className="matching-progress">
              <LinearWithValueLabel />
            </div> */}
            <div className="matching-notice">
              매칭 신청 시간으로부터 30분 내에 매칭되지 않으면 자동으로 매칭
              취소가 진행됩니다. <br />
              또한 새로운 매칭은 기존 매칭 취소 후 가능합니다. <br /> (단,
              밥트너-공트너/룸-랜덤 간의 매칭은 중복 가능합니다.)
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
