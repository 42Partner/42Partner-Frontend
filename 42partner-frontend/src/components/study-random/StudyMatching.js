import React from 'react';
import { Button } from '@material-ui/core/index';
import '../../styles/Matching.scss';
import LinearWithValueLabel from '../common/LinearWithValueLabel';

const MealMatching = () => {
  return (
    <div className="matching-wrapper">
      <h3 className="matching-description" style={{ color: '#0099a4' }}>
        매칭 진행 중 ( 1 / 2 명 )
      </h3>
      <div className="matching-group">
        <span className="tag">When ?</span> <span>06-11시, 12-17시</span>
      </div>
      <div className="matching-group">
        <span className="tag">Where ?</span> <span>서초 클러스터</span>
      </div>
      <div className="matching-group">
        <span className="tag">What ?</span> <span>42과제</span>
      </div>
      <div className="matching-progress">
        <LinearWithValueLabel />
      </div>
      <div className="matching-btn">
        <Button style={{ backgroundColor: '#0099a4' }}>매칭 취소</Button>
      </div>
    </div>
  );
};

export default MealMatching;
