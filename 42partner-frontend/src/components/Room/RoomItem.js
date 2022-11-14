import React, { useState } from 'react';
import '../../styles/RoomItem.scss';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
// import PropTypes from 'prop-types';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';

const RoomItem = () => {
  const [open, setOpen] = useState(false);

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  return (
    <div className="room-item">
      <div className="sort-edge">
        <span className="title-text">제목</span>
        <span className="people-count">
          <GroupsIcon /> <span>n/5</span>
        </span>
      </div>
      <div className="sort-edge">
        <p className="hashtag">#test #test #test</p>
        <div>
          <Button
            style={{ background: '#cccccc', color: 'black' }}
            id="button"
            variant="contained"
            onClick={handleWriteOpen}
          >
            상세
          </Button>
          <ModalTemplate open={open} onClose={handleWriteClose}>
            <RoomDetailForm
              articleId="asdf"
              // createComment={onCreateComment}
              open={open}
              onClose={handleWriteClose}
            />
          </ModalTemplate>
        </div>
      </div>
    </div>
  );
};

// RoomItem.propTypes = {
//   articleId: PropTypes.string.isRequired,
// };

export default RoomItem;
