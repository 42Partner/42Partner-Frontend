import React from 'react';
import MealRandom from '../components/meal-random/MealRandom';
import '../styles/Random.scss';

const MealRandomPage = () => {
  return (
    <div className="random-content-wrapper">
      <MealRandom />
    </div>
  );
};

export default MealRandomPage;
