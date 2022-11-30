import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ReviewModal from './ReviewModal';
import ModalTemplate from '../common/ModalTemplate';

const tmpData = [
  { nickname: 'hyenam', isAuthor: true, isMe: true },
  { nickname: 'asdf', isAuthor: false, isMe: false },
  { nickname: 'ddd', isAuthor: false, isMe: false },
  { nickname: 'vvvv', isAuthor: false, isMe: false },
  { nickname: 'aaa', isAuthor: false, isMe: false },
];

const TmpReviewButton = () => {
  const [open, setOpen] = useState(false);

  const writeModalOpen = () => {
    setOpen(true);
  };

  const writeModalClose = () => {
    setOpen(false);
  };

  return (
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
        상세
      </Button>

      <ModalTemplate open={open} onClose={writeModalClose}>
        <ReviewModal
          matchId="matchId"
          memberList={tmpData}
          onClose={writeModalClose}
        />
      </ModalTemplate>
    </div>
  );
};

export default TmpReviewButton;
