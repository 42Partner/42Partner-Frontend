import React from 'react';
import { Button } from '@material-ui/core/index';

const MatchingComplete = () => {
  return (
    <div className="matching-wrapper">
      <h3 style={{ color: '#0099a4' }}>매칭 완료 ( 4 / 4 명 )</h3>
      <div className="matching-group">
        <span className="tag">When ?</span> <span>18-20시</span>
      </div>
      <div className="matching-group">
        <span className="tag">Where ?</span> <span>개포 클러스터</span>
      </div>
      <div className="matching-group">
        <span className="tag">How ?</span> <span>배달</span>
      </div>
      <div className="matching-group">
        <span className="tag">Who ?</span>
        <span>cadet1, cadet2, cadet3, cadet4</span>
      </div>
      <Button style={{ color: '#0099a4' }}>슬랙으로 연락하기</Button>
    </div>
  );
};

export default MatchingComplete;
