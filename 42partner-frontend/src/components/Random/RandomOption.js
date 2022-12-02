import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core/index';
import CheckBoxList from '../common/CheckBoxListRandom';
import '../../styles/Option.scss';

const RandomOption = ({ topic }) => {
  const [options, setOptions] = useState({
    placeList: [
      { checked: false, value: 'SEOCHO', label: '개포' },
      { checked: false, value: 'GAEPO', label: '서초' },
      { checked: false, value: 'OUT_OF_CLUSTER', label: '기타 (외부)' },
    ],
    timeOfEatingList: [
      { checked: false, value: 'BREAKFAST', label: '아침' },
      { checked: false, value: 'LUNCH', label: '점심' },
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

  const checkData = (name, value, check) => {
    setOptions({
      ...options,
      [name]: options[name].map((op) =>
        op.value === value ? { ...op, checked: check } : op,
      ),
    });

    if (check && matchingOption[name].indexOf(value) === -1) {
      setMatchingOption({
        ...matchingOption,
        [name]: matchingOption[name].concat(value),
      });
    } else if (!check) {
      setMatchingOption({
        ...matchingOption,
        [name]: matchingOption[name].filter((op) => op !== value),
      });
    }
  };

  const checkBoxOptionHandler = (e) => {
    const { name, value, checked } = e.target;
    checkData(name, value, checked);
  };

  return (
    <div className="option-wrapper">
      <h3 className="option-description">
        랜덤 매칭을 기다리는 사용자는 nn명 입니다.
      </h3>
      {topic === 'MEAL' ? (
        <div className="option-where">
          <div className="option-group">
            <CheckBoxList
              list={options.placeList}
              topic="장소"
              type="placeList"
              checkBoxOptionHandler={checkBoxOptionHandler}
            />
          </div>
          <div className="option-group">
            <CheckBoxList
              list={options.wayOfEatingList}
              topic="식사 방식"
              type="wayOfEatingList"
              checkBoxOptionHandler={checkBoxOptionHandler}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="option-where">
            <div className="option-group">
              <CheckBoxList
                list={options.placeList}
                topic="장소"
                type="placeList"
                checkBoxOptionHandler={checkBoxOptionHandler}
              />
            </div>
          </div>
          <div className="option-what">
            <div className="option-group">
              <CheckBoxList
                list={options.typeOfStudyList}
                topic="공부 종류"
                type="typeOfStudyList"
                checkBoxOptionHandler={checkBoxOptionHandler}
              />
            </div>
          </div>
        </div>
      )}
      <div className="option-btn">
        <Button style={{ marginRight: 20, backgroundColor: '#dee1e3' }}>
          초기화
        </Button>
        <Button style={{ backgroundColor: 'lightpink' }}>매칭</Button>
      </div>
    </div>
  );
};

export default RandomOption;

RandomOption.propTypes = {
  topic: PropTypes.string.isRequired,
};
