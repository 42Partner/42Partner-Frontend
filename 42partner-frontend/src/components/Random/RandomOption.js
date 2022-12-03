import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core/index';
import CheckBoxList from '../common/CheckBoxListRandom';
import '../../styles/Option.scss';
import { getRandomMatch, postRandomMatch } from '../../modules/random';

const RandomOption = ({ topic, flip }) => {
  const dispatch = useDispatch();
  //   const { sendOption } = useSelector(({ random }) => ({
  //     sendOption: random.option,
  //   }));

  const [options, setOptions] = useState({
    placeList: [
      { checked: false, value: 'SEOCHO', label: '개포 클러스터' },
      { checked: false, value: 'GAEPO', label: '서초 클러스터' },
      { checked: false, value: 'OUT_OF_CLUSTER', label: '기타 (외부)' },
    ],
    timeOfEatingList: [
      { checked: false, value: 'BREAKFAST', label: '아침' },
      { checked: false, value: 'LUNCH', label: '점심' },
      { checked: false, value: 'DINNER', label: '저녁' },
      { checked: false, value: 'MIDNIGHT', label: '야식' },
    ],
    typeOfStudyList: [
      { checked: false, value: 'INNER_CIRCLE', label: '42과제' },
      { checked: false, value: 'NOT_INNER_CIRCLE', label: '기타 (42과제 외)' },
    ],
    wayOfEatingList: [
      { checked: false, value: 'DELIVERY', label: '배달' },
      { checked: false, value: 'EATOUT', label: '도보' },
      { checked: false, value: 'TAKEOUT', label: '기타' },
    ],
  });
  const [matchingOption, setMatchingOption] = useState({
    placeList: [],
    timeOfEatingList: [],
    typeOfStudyList: [],
    wayOfEatingList: [],
  });

  const [option, setOption] = useState({
    contentCategory: null,
    matchConditionRandomMatchDto: {
      placeList: null,
      typeOfStudyList: null,
      wayOfEatingList: null,
    },
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

  const initCheckBoxOptions = () => {
    setOptions({
      placeList: [
        { checked: false, value: 'SEOCHO', label: '개포 클러스터' },
        { checked: false, value: 'GAEPO', label: '서초 클러스터' },
        { checked: false, value: 'OUT_OF_CLUSTER', label: '기타 (외부)' },
      ],
      typeOfStudyList: [
        { checked: false, value: 'INNER_CIRCLE', label: '42 과제' },
        {
          checked: false,
          value: 'NOT_INNER_CIRCLE',
          label: '기타 (42과제 외)',
        },
      ],
      wayOfEatingList: [
        { checked: false, value: 'DELIVERY', label: '배달' },
        { checked: false, value: 'EATOUT', label: '도보' },
        { checked: false, value: 'TAKEOUT', label: '기타' },
      ],
    });
  };
  useEffect(() => {
    initCheckBoxOptions();
  }, []);

  useEffect(() => {
    setOption({
      contentCategory: `${topic}`,
      matchConditionRandomMatchDto: {
        placeList: matchingOption.placeList,
        typeOfStudyList: matchingOption.typeOfStudyList
          ? matchingOption.typeOfStudyList
          : null,
        wayOfEatingList: matchingOption.wayOfEatingList
          ? matchingOption.wayOfEatingList
          : null,
      },
    });
  }, [matchingOption]);

  const matchingHandler = (e) => {
    flip(e);
    console.log(option);
    dispatch(postRandomMatch({ option }));
    const url = topic.toLowerCase();
    dispatch(getRandomMatch({ url }));
  };

  const clearHandler = () => {
    initCheckBoxOptions();
  };

  return (
    <div className="option-wrapper">
      <h3 className="option-description">
        랜덤 매칭을 기다리는 사용자는 nn명 입니다.
      </h3>
      {topic === 'MEAL' ? (
        <div>
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
              list={options.typeOfStudyList}
              topic="공부 종류"
              type="typeOfStudyList"
              checkBoxOptionHandler={checkBoxOptionHandler}
            />
          </div>
        </div>
      )}
      <div className="option-btn">
        <Button
          onClick={clearHandler}
          style={{ marginRight: 20, backgroundColor: '#dee1e3' }}
        >
          초기화
        </Button>
        <Button
          onClick={matchingHandler}
          style={{ backgroundColor: 'lightpink' }}
        >
          매칭
        </Button>
      </div>
    </div>
  );
};

export default RandomOption;

RandomOption.propTypes = {
  topic: PropTypes.string.isRequired,
  flip: PropTypes.func.isRequired,
};
