/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import HistroyItem from './HistroyItem';
import '../../styles/HistroyList.scss';
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
  // console.log(matches.content[0].matchConditionDto.timeOfEatingList);
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
        id={matchData[0]}
        content={matchData[1]}
        method={matchData[2]}
        date={matchData[3]}
      />
    </div>
  );
};

export default HistroyList;
