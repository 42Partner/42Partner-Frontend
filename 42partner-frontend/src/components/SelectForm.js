import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SelectForm.scss';

const SelectForm = () => {
  // Link들은 임의주소 설정
  return (
    <div className="select-form">
      <div className="select-button">
        <Link
          to="/meal/random"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <img alt="meal_icon" src="./images/meal_icon.png" />
        </Link>
      </div>
      <div className="select-button">
        <Link
          to="/study_random"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <img alt="study_icon" src="./images/study_icon.jpeg" />
        </Link>
      </div>
    </div>
  );
};

export default SelectForm;
