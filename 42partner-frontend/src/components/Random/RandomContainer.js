import React, { useState, useEffect, useLocation } from 'react';
// import MealOption from './MealOption';
import '../../styles/Random.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core/index';
import MealOption from './MealOption';
import MealMatching from './MealMatching';

const RandomContainer = () => {
  const location = useLocation();
  const [topic, setTopic] = useState('MEAL');
  useEffect(() => {
    if (location.pathname.includes('meal')) {
      setTopic('MEAL');
    } else {
      setTopic('STUDY');
    }
  }, [location]);
  const [options, setOptions] = useState({
    placeList: [
      { checked: false, value: 'SEOCHO', label: '개포' },
      { checked: false, value: 'GAEPO', label: '서초' },
      { checked: false, value: 'OUT_OF_CLUSTER', label: '기타 (외부)' },
    ],
    timeOfEatingList: [
      { checked: false, value: 'BREAKFAST', label: '아침' },
      { checked: false, value: 'LUNCH', label: '점심' },
      { checked: false, value: 'DUNCH', label: '점저' },
      { checked: false, value: 'DINNER', label: '저녁' },
      { checked: false, value: 'MIDNIGHT', label: '야식' },
    ],
    typeOfStudyList: [
      { value: 'INNER_CIRCLE', label: '본 과정' },
      { value: 'NOT_INNER_CIRCLE', label: '비 본 과정' },
    ],
    wayOfEatingList: [
      { value: 'DELIVERY', label: '배달' },
      { value: 'EATOUT', label: '도보' },
      { value: 'TAKEOUT', label: '기타' },
    ],
  });
  const [matchingOption, setMatchingOption] = useState({
    placeList: [],
    timeOfEatingList: [],
    typeOfStudyList: [],
    wayOfEatingList: [],
  });
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

export default RandomContainer;
