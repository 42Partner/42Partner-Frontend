import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/LunchPageTemplate.scss';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';

const LunchPageTemplate = ({ children }) => {
  const location = useLocation();

  return (
    <div className="lunch-page-template">
      <NavigationBar />
      <div className="matching-wrapper">
        <div className="matching-button">
          {location.pathname === '/lunch_random' ? (
            <Link style={{ background: '#cccccc' }} to="/lunch_random">
              Random Matching
            </Link>
          ) : (
            <Link to="/lunch_random">Random Matching</Link>
          )}
          {location.pathname === '/lunch_roomlist' ? (
            <Link style={{ background: '#cccccc' }} to="/lunch_roomlist">
              Room Matching
            </Link>
          ) : (
            <Link to="/lunch_roomlist">Room Matching</Link>
          )}
        </div>
        <div className="matching-place">{children}</div>
      </div>
    </div>
  );
};

LunchPageTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LunchPageTemplate;
