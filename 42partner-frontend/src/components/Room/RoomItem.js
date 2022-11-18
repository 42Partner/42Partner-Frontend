import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';
import '../../styles/RoomItem.scss';
// eslint-disable-next-line no-unused-vars
import CreateRoomForm from './CreateRoomForm';
import RoomInfo from './RoomInfo';
import { changeEditMode } from '../../modules/rooms';

const RoomItem = ({ articleInfo, hashtag }) => {
  const dispatch = useDispatch();
  const { editMode } = useSelector(({ rooms }) => ({
    editMode: rooms.editMode,
  }));

  const [open, setOpen] = useState(false);

  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
    dispatch(changeEditMode(false));
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
              />
            ) : (
              <RoomDetailForm
                roomInfoPart={
                  <div>
                    <RoomInfo articleInfo={articleInfo} />
                    <p className="hashtag">{hashtag}</p>
                  </div>
                }
                articleId={articleInfo.articleId}
                onClose={handleWriteClose}
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
