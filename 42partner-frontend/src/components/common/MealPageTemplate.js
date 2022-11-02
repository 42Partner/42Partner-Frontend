import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/MealPageTemplate.scss';
import PropTypes from 'prop-types';

const MealPageTemplate = ({ children }) => {
  const location = useLocation();

  return (
    <div className="meal-page-template">
      <div className="matching-wrapper">
        <div className="matching-button">
          {location.pathname === '/meal/random' ? (
            <Link style={{ background: '#cccccc' }} to="/meal/random">
              Random Matching
            </Link>
          ) : (
            <Link to="/meal/random">Random Matching</Link>
          )}
          {location.pathname === '/meal/room' ? (
            <Link style={{ background: '#cccccc' }} to="/meal/room">
              Room Matching
            </Link>
          ) : (
            <Link to="/meal/room">Room Matching</Link>
          )}
        </div>
        <div className="matching-place">{children}</div>
      </div>
    </div>
  );
};

MealPageTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MealPageTemplate;
