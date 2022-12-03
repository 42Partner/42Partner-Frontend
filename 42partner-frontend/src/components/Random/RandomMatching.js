import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';
import '../../styles/Matching.scss';
import LinearWithValueLabel from '../common/LinearWithValueLabel';
import { cancelRandomMatch } from '../../modules/random';

const RandomMatching = ({ topic, flip }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    contentCategory: null,
  });
  //   const { options } = useSelector(({ random }) => ({
  //     options: random.options,
  //   }));
  //   useEffect(() => {
  //     dispatch(getRandomMatch(topic));
  //     console.log(options);
  //   }, []);
  useEffect(() => {
    setCategory({
      contentCategory: `${topic}`,
    });
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
        {topic === 'MEAL' ? (
          <div className="matching-field">
            <div className="matching-group">
              <h3>장소</h3>
              <span>개포 클러스터</span>
            </div>
            <div className="matching-group">
              <h3>식사 방식</h3>
              <span>배달</span>
            </div>
          </div>
        ) : (
          <div className="matching-field">
            <div className="matching-group">
              <h3>장소</h3>
              <span>개포 클러스터</span>
            </div>
            <div className="matching-group">
              <h3>학습 종류</h3>
              <span>42 과제 외 학습</span>
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
