import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SelectForm.scss';

const SelectForm = () => {
  // Link들은 임의주소 설정
  return (
    <div className="select-form">
      <Link
        to="/meal/random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div id="select-button">
          <img alt="meal_icon" src="./images/meal_icon.png" />
        </div>
      </Link>
      <Link
        to="/study_random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div id="select-button">
          <img alt="study_icon" src="./images/study_icon.jpeg" />
        </div>
      </Link>
    </div>
  );
};

export default SelectForm;
