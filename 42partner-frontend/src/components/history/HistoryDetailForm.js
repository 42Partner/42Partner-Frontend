import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import CommentLIst from '../comment/CommentLIst';
import '../../styles/HistoryDetailForm.scss';

const HistoryDetailForm = ({ category, open, onClose }) => {
  const [isRoom, setIsRoom] = useState(false);

  useEffect(() => {
    if (category === 'room') {
      setIsRoom(true);
    }
  }, []);

  return (
    <div className="history-detail-form">
      <div className="close-button">
        <IconButton open={open} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="paragraph">
        <h2>밥트너 랜덤매칭 (20yy-mm-dd) {isRoom} </h2>
        <h3>Intra_id, intra_id2, intra_id3</h3>
      </div>
      {isRoom && (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      )}
      <div className="select-info-wrapper">
        <div>장소 : 개포 </div>
        <div>시간대 : 점심</div>
        <div> 배달여부 : 배달</div>
      </div>
      {isRoom && (
        <div>
          <p className="hashtag paragraph">#text1 #text #text #tadsfasdf</p>
          <CommentLIst />
        </div>
      )}
    </div>
  );
};

HistoryDetailForm.propTypes = {
  category: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistoryDetailForm;
