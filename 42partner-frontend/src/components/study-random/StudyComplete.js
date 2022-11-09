import React from 'react';
import { Button } from '@material-ui/core/index';

const StudyComplete = () => {
  return (
    <div className="matching-wrapper">
      <h3 style={{ color: '#0099a4' }}>매칭 완료 ( 4 / 4 명 )</h3>
      <div className="matching-groupe">
        <span className="tag">When ?</span> <span>12-17시</span>
      </div>
      <div className="matching-group">
        <span className="tag">Where ?</span> <span>서초 클러스터</span>
      </div>
      <div className="matching-group">
        <span className="tag">What ?</span> <span>42과제</span>
      </div>
      <div className="matching-group">
        <span className="tag">Who ?</span>
        <span>cadet1, cadet2, cadet3, cadet4</span>
      </div>
      <Button style={{ color: '#0099a4' }}>슬랙으로 연락하기</Button>
    </div>
  );
};

export default StudyComplete;
