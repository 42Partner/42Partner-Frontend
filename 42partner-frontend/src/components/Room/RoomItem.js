import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import ModalTemplate from '../common/ModalTemplate';
import RoomDetailForm from './RoomDetailForm';
// import ConvertMap from '../common/ConvertMap';
import '../../styles/RoomItem.scss';
import CreateRoomForm from './CreateRoomForm';
import CommentPart from '../comment/CommentPart';
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
    if (editMode) {
      dispatch(changeEditMode(false));
    } else {
      setOpen(false);
    }
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
            style={{
              background: '#cccccc',
              color: 'black',
              backgroundColor: 'lightPink',
            }}
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
                articleId={articleInfo.articleId}
              />
            ) : (
              <RoomDetailForm
                roomInfoPart={
                  <div>
                    <RoomInfo articleInfo={articleInfo} />
                    <p className="hashtag">{hashtag}</p>
                  </div>
                }
                commetPart={
                  <CommentPart
                    anonymity={articleInfo.anonymity}
                    articleId={articleInfo.articleId}
                  />
                }
                articleInfo={articleInfo}
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
    // eslint-disable-next-line react/forbid-prop-types
    matchConditionDto: PropTypes.object,
    nickname: PropTypes.string,
    participantNum: PropTypes.number,
    participantNumMax: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  hashtag: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoomItem;
