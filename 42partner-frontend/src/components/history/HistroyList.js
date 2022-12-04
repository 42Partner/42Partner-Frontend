import React from 'react';
import PropTypes from 'prop-types';
import HistroyItem from './HistroyItem';
import '../../styles/HistroyList.scss';

const HistroyList = ({ matcheList }) => {
  return (
    <div className="history-list">
      {matcheList.map((m) => {
        return <HistroyItem key={m.matchId} matchId={m.matchId} detail={m} />;
      })}
    </div>
  );
};

export default HistroyList;

HistroyList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  matcheList: PropTypes.array.isRequired,
};
