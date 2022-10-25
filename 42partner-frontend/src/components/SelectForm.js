import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SelectForm.scss';

const SelectForm = () => {
  // Link들은 임의주소 설정
  return (
    <div className="select-form">
      <Link
        to="/lunch_random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className="lunch-button">
          <img alt="lunch_icon" src="./images/lunch_icon.png" />
          <h1>밥트너 찾기</h1>
          <p>
            랜덤 매칭 - 개인별 옵션에 따른 4명 매칭 가능
            <br />방 단위 매칭 - 옵션 설정 후 방 생성, 참여 가능
          </p>
        </div>
      </Link>
      <Link
        to="/study_random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className="study-button">
          <img alt="study_icon" src="./images/study_icon.jpeg" />
          <h1>공부트너 찾기</h1>
          <p>랜덤 매칭 - 개인별 옵션에 따른 4명 매칭 가능</p>
        </div>
      </Link>
    </div>
  );
};

export default SelectForm;
