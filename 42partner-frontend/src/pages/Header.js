import React from 'react';
import '../styles/Header.scss';

function Header() {
  return (
    <div className="header">
      <span className="logo">
        <h1>42</h1>
        <h1 className="partner-text">Partner</h1>
      </span>
      <h3>Find partner to eat and to study in 42Seoul</h3>
    </div>
  );
}

export default Header;
