import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CustomColorButton from '../common/CustomColorButton';
import { writeReview } from '../../modules/history';
// import { getProfile } from '../../modules/mypage';
import '../../styles/ReviewModal.scss';

const ReviewModal = ({ matchId, memberList, onClose }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector(({ mypage }) => ({
  //   user: mypage.user,
  // }));
  const [reviewList, setReviewList] = useState([]);

  const handleRatingValue = (e) => {
    const { name, value } = e.target;
    setReviewList(
      reviewList.map((m) =>
        m.nickname === name
          ? { ...m, activityMatchScore: parseInt(value, 10) }
          : m,
      ),
    );
  };

  const makeRatingList = () => {
    const tmp = memberList
      .filter((member) => member.isMe === false)
      .map((member) => ({
        nickname: member.nickname,
        activityMatchScore: 0,
        noShow: false,
      }));

    setReviewList(tmp);
  };

  const noShowHandler = (e) => {
    const { name } = e.target;
    setReviewList(
      reviewList.map((m) =>
        m.nickname === name ? { ...m, activityMatchScore: 0, noShow: true } : m,
      ),
    );
  };

  const makeMemberList = () => {
    return reviewList.map((m) => (
      <div key={m.nickname} className="rating-member">
        <div className="profile-image">
          {/* <img src={user.imageUrl} alt="profile-img" /> */}
          {m.nickname}
        </div>
        <Rating
          name={m.nickname}
          value={m.activityMatchScore}
          onChange={handleRatingValue}
          disabled={m.noShow}
        />
        <CustomColorButton
          button={
            <Button
              name={m.nickname}
              className="button"
              variant="contained"
              color="complete"
              onClick={noShowHandler}
            >
              참여 안함
            </Button>
          }
        />
      </div>
    ));
  };

  const reviewHandler = () => {
    dispatch(writeReview({ matchId, reviewList }));
    onClose();
  };

  useEffect(() => {
    // dispatch(getProfile());
    makeRatingList();
  }, []);

  return (
    <div className="review-wrapper">
      {reviewList && makeMemberList()}
      <CustomColorButton
        button={
          <Button
            fullWidth
            className="button"
            variant="contained"
            onClick={reviewHandler}
          >
            리뷰 작성 완료
          </Button>
        }
      />
    </div>
  );
};

ReviewModal.propTypes = {
  matchId: PropTypes.string.isRequired,
  memberList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      isAuthor: PropTypes.bool.isRequired,
      isMe: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewModal;
