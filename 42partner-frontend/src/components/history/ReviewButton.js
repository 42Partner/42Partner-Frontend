import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ReviewModal from './ReviewModal';
import ModalTemplate from '../common/ModalTemplate';
import { getDetail } from '../../modules/mypage';

const ReviewButton = ({ matchId, detail }) => {
  const dispatch = useDispatch();
  const [reviewOpen, setReviewOpen] = useState(false);

  const writeModalOpen = () => {
    dispatch(getDetail({ matchId }));
    setReviewOpen(true);
  };

  const writeModalClose = () => {
    setReviewOpen(false);
  };

  return (
    <div className="history-button">
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

      <ModalTemplate open={reviewOpen} onClose={writeModalClose}>
        <ReviewModal
          matchId={matchId}
          memberList={detail.participantsOrAuthor}
          onClose={writeModalClose}
        />
      </ModalTemplate>
    </div>
  );
};

ReviewButton.propTypes = {
  matchId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  detail: PropTypes.object.isRequired,
};

export default ReviewButton;
