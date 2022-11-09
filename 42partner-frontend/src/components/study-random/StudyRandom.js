import React, { useState } from 'react';
import '../../styles/Random.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core/index';
import StudyOption from './StudyOption';
import StudyMatching from './StudyMatching';

const StudyRandom = () => {
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
              <StudyOption />
            </p>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">
              <StudyMatching />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRandom;
