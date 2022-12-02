import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
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

  //   if (matches.length === 0)
  //     return <div className="matching-history-wrapper">No Matching History</div>;

  return (
    <div className="matching-history-wrapper">
      {matches &&
        matches.map((match) => (
          <HistroyList key={match.matchId} match={match} />
        ))}
    </div>
  );
};

export default MatchingHistory;
