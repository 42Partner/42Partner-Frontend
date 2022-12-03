import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/Random.scss';
import cn from 'classnames';
import { Button } from '@material-ui/core/index';
import { MdMeetingRoom } from 'react-icons/md';
import RandomOption from './RandomOption';
import RandomMatching from './RandomMatching';

const RandomContainer = () => {
  const location = useLocation();
  const [topic, setTopic] = useState('MEAL');
  const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setShowBack(!showBack);
  };

  useEffect(() => {
    if (location.pathname.includes('meal')) {
      setTopic('MEAL');
    } else {
      setTopic('STUDY');
    }
  }, [location]);

  const url = topic.toLowerCase();
  return (
    <div>
      <Link to={`/${url}/room`} style={{ textDecoration: 'none' }}>
        <Button>
          <MdMeetingRoom style={{ width: '40px', height: '40px' }} /> Room
          Matching
        </Button>
      </Link>
      <div className="flip-card-outer">
        <div
          className={cn('flip-card-inner', {
            showBack,
          })}
        >
          <div className="card front">
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="card-text fs-1 fw-bold">
                <RandomOption topic={topic} flip={handleClick} />
              </div>
            </div>
          </div>
          <div className="card back">
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="card-text fs-1 fw-bold">
                <RandomMatching topic={topic} flip={handleClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomContainer;
