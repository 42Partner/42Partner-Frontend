import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/Random.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/index';
import { MdMeetingRoom } from 'react-icons/md';
import RandomOption from './RandomOption';
import RandomMatching from './RandomMatching';
import { getRandomMatch } from '../../modules/random';
import CustomColorButton from '../common/CustomColorButton';

const RandomContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [topic, setTopic] = useState('MEAL');
  const { showBack } = useSelector(({ random }) => ({
    showBack: random.showBack,
  }));

  useEffect(() => {
    if (location.pathname.includes('meal')) {
      setTopic('MEAL');
    } else {
      setTopic('STUDY');
    }
  }, [location]);

  useEffect(() => {
    const contentCategory = topic;
    dispatch(getRandomMatch({ contentCategory }));
  }, [topic]);

  const url = topic.toLowerCase();
  return (
    <div style={{ paddingTop: '17px' }}>
      {/* <Link to={`/${url}/room`} style={{ textDecoration: 'none' }}>
        <Button>
          <MdMeetingRoom style={{ width: '40px', height: '40px' }} /> Room
          Matching
        </Button>
      </Link> */}
      <Link to={`/${url}/room`} className="change-matching">
        <div style={{ paddingBottom: '20px' }}>
          <CustomColorButton
            button={
              <Button
                style={{
                  backgroundColor: 'lightpink',
                  color: 'white',
                  fontFamily: 'ubuntu-medium',
                }}
                sx={{ mt: 2 }}
                fullWidth
                variant="contained"
              >
                <MdMeetingRoom style={{ width: '30px', height: '30px' }} />
                Room Matching
              </Button>
            }
          />
        </div>
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
                <RandomOption topic={topic} showBack={showBack} />
              </div>
            </div>
          </div>
          <div className="card back">
            <div className="card-body d-flex justify-content-center align-items-center">
              <div className="card-text fs-1 fw-bold">
                <RandomMatching topic={topic} showBack={showBack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomContainer;
