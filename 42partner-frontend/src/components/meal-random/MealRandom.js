import React, { useState } from 'react';
// import MealOption from './MealOption';
import '../../styles/Random.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core/index';
import MealOption from './MealOption';
import MealMatching from './MealMatching';

const MealRandom = () => {
  const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setShowBack(!showBack);
  };

  return (
    <div className="flip-card-outer">
      <Button onClick={handleClick}>click</Button>
      <div
        className={cn('flip-card-inner', {
          showBack,
        })}
      >
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">
              <MealOption />
            </p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">
              <MealMatching />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealRandom;
