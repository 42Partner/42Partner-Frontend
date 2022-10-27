import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

// 나중에 기능 구현할떄 로그인 페이지에선 마이페이지 아이콘 안보이게 수정해야함.
const Header = () => {
  return (
    <div className="header">
      <div className="text-wrapper">
        <span className="logo">
          <h1>42</h1>
          <h1 className="partner-text">Partner</h1>
        </span>
        <h3>Find partner to eat and to study in 42Seoul</h3>
      </div>
      <div className="profile">
        <Link to="/mypage">
          <img alt="profile_image" src="/images/sample_profile.jpeg" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
