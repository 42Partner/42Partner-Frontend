import React, { useState, useEffect } from 'react';
import '../../styles/HistroyList.scss';
import PropTypes from 'prop-types';
import HistroyItem from './HistroyItem';
import ConvertMap from '../common/ConvertMap';

const HistroyList = ({ match }) => {
  const [matchData, setMatchData] = useState([]);

  // eslint-disable-next-line prefer-destructuring
  const matchId = match.matchId;
  const contentCategory = ConvertMap.get(match.contentCategory);
  const methodCategory = ConvertMap.get(match.methodCategory);

  const changeDateFormat = (date) => {
    return date.substr(0, 10);
  };

  useEffect(() => {
    const getMatchData = async () => {
      try {
        setMatchData([
          matchId,
          contentCategory,
          methodCategory,
          changeDateFormat(match.createdAt),
        ]);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getMatchData();
  }, []);

  return (
    <div className="history-list">
      <HistroyItem
        matchId={matchData[0]}
        content={matchData[1]}
        method={matchData[2]}
        date={matchData[3]}
      />
    </div>
  );
};

export default HistroyList;

HistroyList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};
