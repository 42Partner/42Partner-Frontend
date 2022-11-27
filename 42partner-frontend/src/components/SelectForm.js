import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SelectForm.scss';

const SelectForm = () => {
  return (
    <div className="select-form">
      <Link
        className="select-button"
        to="/meal/random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <img alt="meal_icon" src="./images/meal_icon.png" />
      </Link>
      <Link
        className="select-button"
        to="/study/random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <img alt="study_icon" src="./images/study_icon.jpeg" />
      </Link>
    </div>
  );
};

export default SelectForm;
