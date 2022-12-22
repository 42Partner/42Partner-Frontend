import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/Random.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core/index';
import { MdMeetingRoom } from 'react-icons/md';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RandomOption from './RandomOption';
import RandomMatching from './RandomMatching';
import { getMatchCondition, getRandomMatch } from '../../modules/random';
import CustomColorButton from '../common/CustomColorButton';
import ErrorSnackBar from '../common/ErrorSnackBar';

const RandomContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [topic, setTopic] = useState('MEAL');
  const [conflict, setConflict] = useState(false);
  const { showBack, requestError } = useSelector(({ random }) => ({
    showBack: random.showBack,
    requestError: random.requestError,
  }));

  const snackbarHandler = () => {
    setConflict(false);
  };

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

  useEffect(() => {
    if (showBack) {
      dispatch(getMatchCondition({ topic }));
    }
  }, [showBack]);

  useEffect(() => {
    if (requestError && 'response' in requestError) {
      setConflict(true);
    }
  }, [requestError]);

  const url = topic.toLowerCase();
  return (
    <div className="random-container">
      {topic === 'MEAL' ? (
        <RestaurantIcon className="icon" />
      ) : (
        <MenuBookIcon className="icon" />
      )}
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
      {conflict && (
        <ErrorSnackBar
          open={conflict}
          onClose={snackbarHandler}
          response={requestError.response}
        />
      )}
    </div>
  );
};

export default RandomContainer;
