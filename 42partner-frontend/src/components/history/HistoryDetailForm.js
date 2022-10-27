import React from 'react';
import Button from '@mui/material/Button';
import '../../styles/HistoryDetailForm.scss';

const HistoryDetailForm = () => {
  return (
    <div className="history-detail-form">
      <div className="title-info">
        <h2 className="matching-category">랜덤매칭</h2>
        <h1>20nn-nn-nn</h1>
        <h3>Intra_id, intra_id2, intra_id3</h3>
      </div>
      <div className="select-info-wrapper">
        <div>장소 : 개포 </div>
        <div>시간대 : 점심</div>
        <div> 배달여부 : 배달</div>
      </div>
      <div className="button-wrapper">
        <Button id="button" variant="contained">
          닫기
        </Button>
      </div>
    </div>
  );
};

export default HistoryDetailForm;
