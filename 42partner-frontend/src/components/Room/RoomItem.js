import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';
import '../../styles/RoomItem.scss';
import CreateRoomForm from './CreateRoomForm';

const RoomItem = ({ articleInfo, hashtag }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handlerEditMode = (isEditMode) => {
    setEditMode(isEditMode);
  };

  return (
    <div className="room-item">
      <div className="sort-edge">
        <span className="title-text">{articleInfo.title}</span>
        <span className="people-count">
          <GroupsIcon />
          <span>
            {articleInfo.participantNum}/{articleInfo.participantNumMax}
          </span>
        </span>
      </div>
      <div className="sort-edge">
        <p className="hashtag">{hashtag}</p>
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
            {editMode ? (
              <CreateRoomForm
                topic={articleInfo.contentCategory}
                onClose={handleWriteClose}
                editMode={editMode}
                onEditMode={handlerEditMode}
              />
            ) : (
              <RoomDetailForm
                articleInfo={articleInfo}
                hashtag={hashtag}
                onClose={handleWriteClose}
                editMode={editMode}
                onEditMode={handlerEditMode}
              />
            )}
          </ModalTemplate>
        </div>
      </div>
    </div>
  );
};

RoomItem.propTypes = {
  articleInfo: PropTypes.shape({
    anonymity: PropTypes.bool,
    articleId: PropTypes.string,
    content: PropTypes.string,
    contentCategory: PropTypes.string,
    createdAt: PropTypes.string,
    date: PropTypes.string,
    isToday: PropTypes.bool,
    matchConditionDto: PropTypes.objectOf(
      PropTypes.shape({
        placeList: PropTypes.arrayOf(PropTypes.string),
        timeOfEatingList: PropTypes.arrayOf(PropTypes.string),
        typeOfStudyList: PropTypes.arrayOf(PropTypes.string),
        wayOfEatingList: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    nickname: PropTypes.string,
    participantNum: PropTypes.number,
    participantNumMax: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  hashtag: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoomItem;
