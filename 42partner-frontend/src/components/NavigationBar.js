import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavigationBar.scss';

const activeLinkStyle = {
  background: '#9e9e9e',
};

const NavigationBar = () => {
  const location = useLocation();

  return (
    <div>
      <div className="navigation-wrapper">
        <div className="logo-wrapper">
          <img alt="lunch_icon" src="./images/lunch_icon.png" />
          <h1>밥트너</h1>
        </div>
        <div className="navigation-bar">
          {location.pathname === '/home' ? (
            <Link style={activeLinkStyle} to="/home">
              홈
            </Link>
          ) : (
            <Link to="/home">홈</Link>
          )}
          {location.pathname.includes('/lunch') ? (
            <Link style={activeLinkStyle} to="/lunch_random">
              밥트너
            </Link>
          ) : (
            <Link to="/lunch_random">밥트너</Link>
          )}
          {location.pathname === '/home' ? (
            <Link style={activeLinkStyle} to="/study_random">
              공부트너
            </Link>
          ) : (
            <Link to="/study_random">공부트너</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
