import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/MyPageTemplate.scss';

const buttonStyle = {
  background: '#cccccc',
};

const MyPageTemplate = ({ children }) => {
  const location = useLocation();

  return (
    <div className="mypage-template">
      <div className="mypage-button">
        {location.pathname === '/mypage' ? (
          <Link style={buttonStyle} to="/lunch/random">
            My Page
          </Link>
        ) : (
          <Link to="/mypage">My Page</Link>
        )}

        {location.pathname === '/mypage/matching_history' ? (
          <Link style={buttonStyle} to="/lunch/room">
            Matching History
          </Link>
        ) : (
          <Link id="button" to="/mypage/matching_history">
            Matching History
          </Link>
        )}

        {location.pathname === '/mypage/review' ? (
          <Link style={buttonStyle} to="/lunch/room">
            Matching Review
          </Link>
        ) : (
          <Link id="button" to="/mypage/review">
            Matching Review
          </Link>
        )}
      </div>
      <div className="content-place">{children}</div>
    </div>
  );
};

MyPageTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MyPageTemplate;
