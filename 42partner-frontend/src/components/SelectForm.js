import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
        <RestaurantIcon className="icon" />
      </Link>
      <Link
        className="select-button"
        to="/study/random"
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <MenuBookIcon className="icon" />
      </Link>
    </div>
  );
};

export default SelectForm;
