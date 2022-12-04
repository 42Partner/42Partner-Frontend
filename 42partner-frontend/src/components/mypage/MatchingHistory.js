import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HistroyList from '../history/HistroyList';
import '../../styles/Matching.scss';
import { getMatches } from '../../modules/mypage';

const MatchingHistory = () => {
  const dispatch = useDispatch();
  const { matches } = useSelector(({ mypage }) => ({
    matches: mypage.matches,
  }));

  useEffect(() => {
    dispatch(getMatches());
  }, []);

  return (
    <div className="matching-history-wrapper">
      {matches && <HistroyList matcheList={matches} />}
    </div>
  );
};

export default MatchingHistory;
