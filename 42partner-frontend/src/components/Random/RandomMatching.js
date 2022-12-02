import React from 'react';
// import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core/index';
import PropTypes from 'prop-types';
import '../../styles/Matching.scss';
import LinearWithValueLabel from '../common/LinearWithValueLabel';

const RandomMatching = ({ topic }) => {
  // const dispatch = useDispatch();
  //   const { randomMatching } = useSelector(({ random }) => ({
  //     randomMatching : random.option,
  //   }));
  return (
    <div className="matching-wrapper">
      <h3 className="matching-description" style={{ color: '#0099a4' }}>
        매칭 진행 중 ( 2 / 4 명 )
      </h3>
      {topic === 'MEAL' ? (
        <div>
          <div className="matching-group">
            <span className="tag">Where ?</span> <span>개포 클러스터</span>
          </div>
          <div className="matching-group">
            <span className="tag">How ?</span> <span>배달</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="matching-group">
            <span className="tag">Where ?</span> <span>개포 클러스터</span>
          </div>
          <div className="matching-group">
            <span className="tag">What ?</span> <span>42과제</span>
          </div>
        </div>
      )}

      <div className="matching-progress">
        <LinearWithValueLabel />
      </div>
      <div className="matching-btn">
        <Button style={{ backgroundColor: '#0099a4' }}>매칭 취소</Button>
      </div>
    </div>
  );
};

export default RandomMatching;

RandomMatching.propTypes = {
  topic: PropTypes.string.isRequired,
};
