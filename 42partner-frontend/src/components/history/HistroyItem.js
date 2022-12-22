import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ModalTemplate from '../common/ModalTemplate';
import HistoryDetailForm from './HistoryDetailForm';
import '../../styles/HistroyItem.scss';
import ReviewButton from './ReviewButton';
import ConvertMap from '../common/ConvertMap';
import { getDetail } from '../../modules/mypage';

const HistroyItem = ({ matchId, detail }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDetaileOpen = () => {
    dispatch(getDetail({ matchId }));
    setOpen(true);
  };
  const handleDetaileClose = () => {
    setOpen(false);
  };

  const changeDateFormat = (date) => {
    return date.substr(0, 10);
  };

  return (
    <div>
      <div className="history-item">
        <h3>{ConvertMap.get(detail.contentCategory)}</h3>
        <h3>{ConvertMap.get(detail.methodCategory)}</h3>
        <h3>{changeDateFormat(detail.createdAt)}</h3>
        <div className="button-wrapper">
          <Button
            style={{ background: '#f1f1f1', color: 'black' }}
            className="history-button"
            variant="contained"
            onClick={handleDetaileOpen}
          >
            상세
          </Button>
          {!detail.isReviewed && detail.participantsOrAuthor.length > 1 && (
            <ReviewButton matchId={matchId} detail={detail} />
          )}
          <ModalTemplate open={open} onClose={handleDetaileClose}>
            <HistoryDetailForm
              matchId={matchId}
              detail={detail}
              open={open}
              onClose={handleDetaileClose}
            />
          </ModalTemplate>
        </div>
      </div>
    </div>
  );
};

HistroyItem.propTypes = {
  matchId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  detail: PropTypes.object.isRequired,
};

export default HistroyItem;
