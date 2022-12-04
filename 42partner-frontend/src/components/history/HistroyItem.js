/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/HistroyItem.scss';
import ReviewModal from './ReviewModal';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';
import { getDetail } from '../../modules/mypage';

// const tmpData = [
//   { nickname: 'hyenam', isAuthor: true, isMe: true },
//   { nickname: 'asdf', isAuthor: false, isMe: false },
//   { nickname: 'ddd', isAuthor: false, isMe: false },
//   { nickname: 'vvvv', isAuthor: false, isMe: false },
//   { nickname: 'aaa', isAuthor: false, isMe: false },
// ];

const ReviewButton = ({ matchId, detail }) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const writeModalOpen = () => {
    setReviewOpen(true);
  };

  const writeModalClose = () => {
    setReviewOpen(false);
  };

  return (
    <div>
      {detail && matchId && (
        <div>
          <Button
            style={{
              background: '#cccccc',
              color: 'black',
              backgroundColor: 'lightPink',
            }}
            id="button"
            variant="contained"
            onClick={writeModalOpen}
          >
            리뷰
          </Button>

          <ModalTemplate open={reviewOpen} onClose={writeModalClose}>
            <ReviewModal
              matchId={matchId}
              memberList={detail.participantsOrAuthor}
              onClose={writeModalClose}
            />
          </ModalTemplate>
        </div>
      )}
    </div>
  );
};

const HistroyItem = ({ matchId, content, method, date }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector(({ mypage }) => ({
    detail: mypage.detail,
  }));

  useEffect(() => {
    console.log(matchId);
    dispatch(getDetail({ matchId }));
  }, [matchId]);

  const [open, setOpen] = useState(false);

  const handleDetaileOpen = () => {
    setOpen(true);
  };
  const handleDetaileClose = () => {
    setOpen(false);
  };

  return (
    <div className="history-item">
      <h3>{content}</h3>
      <h3>{method}</h3>
      <h3>{date}</h3>
      <div>
        <Button
          style={{ background: '#f1f1f1', color: 'black' }}
          className="detail-button"
          variant="contained"
          onClick={handleDetaileOpen}
        >
          상세
        </Button>
        <ModalTemplate open={open} onClose={handleDetaileClose}>
          <HistoryDetailForm
            matchId={matchId}
            open={open}
            onClose={handleDetaileClose}
          />
        </ModalTemplate>
        {matchId && detail && (
          <ReviewButton matchId={matchId} detail={detail} />
        )}
      </div>
    </div>
  );
};

export default HistroyItem;
