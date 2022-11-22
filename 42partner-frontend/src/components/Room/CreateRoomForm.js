import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import PropTypes from 'prop-types';
import produce from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/CreateRoomForm.scss';
import {
  changeEditMode,
  createRoom,
  editRoom,
  loadArticleInfo,
  resetArticleData,
} from '../../modules/rooms';
import CheckBoxList from '../common/CheckBoxList';
import RadioButtonList from '../common/RadioButtonList';
import CustomColorButton from '../common/CustomColorButton';

const textFieldStyle = {
  mb: 2,
};

const CreateRoomForm = ({ articleId, topic, onClose, editMode }) => {
  const dispatch = useDispatch();
  const { targetArticle } = useSelector(({ rooms }) => ({
    targetArticle: rooms.targetArticle,
  }));
  const [bookingDate, setBookingDate] = useState(new Date());
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
  const [radioOption, setRadioOption] = useState('');
  const [matchingOption, setMatchingOption] = useState({
    placeList: [],
    timeOfEatingList: [],
    typeOfStudyList: [],
    wayOfEatingList: [],
  });
  const [checkWritable, setCheckWritable] = useState(false);
  const [article, setArticle] = useState({
    anonymity: false,
    content: '',
    contentCategory: topic,
    date: new Date(),
    matchConditionDto: null,
    participantNumMax: 1,
    title: '',
  });

  const articleHandler = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

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

  const radioOptionHandler = (e) => {
    const { name, value } = e.target;
    setRadioOption(value);
    setMatchingOption({
      ...matchingOption,
      [name]: [value],
    });
  };

  const checkFillData = () => {
    let len = 0;
    const minimum = topic === 'MEAL' ? 3 : 2;

    if (article.title === '' || article.content === '') {
      setCheckWritable(false);
      return;
    }

    for (let i = 0; i < Object.keys(matchingOption).length; ) {
      const name = Object.keys(matchingOption)[i];
      if (matchingOption[name].length !== 0) {
        len += 1;
      }
      i += 1;
    }

    if (len < minimum) {
      setCheckWritable(false);
      return;
    }

    setCheckWritable(true);
  };

  const createRoomHandler = () => {
    dispatch(createRoom({ article }));
    onClose();
    console.log(JSON.stringify(article));
  };

  const editRoomHandler = () => {
    dispatch(editRoom({ article, articleId }));
    dispatch(changeEditMode(false));
    onClose();
  };

  const initCheckBoxOptions = () => {
    const { matchConditionDto } = targetArticle;
    const tmpOption = {
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
    };

    for (let i = 0; i < 2; ) {
      const name = Object.keys(matchConditionDto)[i];
      for (let j = 0; j < matchConditionDto[name].length; ) {
        const element = matchConditionDto[name][j];

        tmpOption[name] = tmpOption[name].map((op) =>
          op.value === element ? { ...op, checked: true } : op,
        );
        j += 1;
      }
      i += 1;
    }

    setOptions({
      ...options,
      placeList: tmpOption.placeList,
      timeOfEatingList: tmpOption.timeOfEatingList,
    });
  };

  const initData = () => {
    setArticle({
      ...article,
      anonymity: targetArticle.anonymity,
      content: targetArticle.content,
      contentCategory: targetArticle.contentCategory,
      date: targetArticle.date,
      matchConditionDto: targetArticle.matchConditionDto,
      participantNumMax: targetArticle.participantNumMax,
      title: targetArticle.title,
    });

    setMatchingOption(targetArticle.matchConditionDto);

    if (targetArticle.contentCategory === 'MEAL') {
      setRadioOption(targetArticle.matchConditionDto.wayOfEatingList);
    } else {
      setRadioOption(targetArticle.matchConditionDto.typeOfStudyList);
    }

    initCheckBoxOptions();
  };

  useEffect(() => {
    if (editMode) {
      dispatch(loadArticleInfo({ articleId }));
    }
    return () => {
      dispatch(resetArticleData());
    };
  }, []);

  useEffect(() => {
    checkFillData();
  }, [article]);

  useEffect(() => {
    if (editMode && targetArticle !== null) {
      initData();
    }
  }, [targetArticle]);

  useEffect(() => {
    setArticle({
      ...article,
      matchConditionDto: matchingOption,
      date: `${bookingDate.getFullYear()}-${
        bookingDate.getMonth() + 1
      }-${bookingDate.getDate()}`,
    });
  }, [bookingDate, matchingOption]);

  return (
    <div className="create-room-form">
      <FormControlLabel
        size="small"
        className="check-option-wrapper"
        control={<Checkbox checked={article.anonymity} />}
        value={article.anonymity}
        onChange={(e) =>
          setArticle({ ...article, anonymity: e.target.checked })
        }
        label="익명"
      />
      <TextField
        required
        fullWidth
        sx={textFieldStyle}
        className="title-text"
        variant="standard"
        placeholder="제목을 입력해 주세요 (필수)"
        inputProps={{ maxLength: 20 }}
        value={article.title}
        name="title"
        onChange={articleHandler}
      />
      <div className="check-option-wrapper">
        <CheckBoxList
          list={options.placeList}
          topic="장소"
          type="placeList"
          checkBoxOptionHandler={checkBoxOptionHandler}
        />
        {topic === 'MEAL' ? (
          <div>
            <CheckBoxList
              list={options.timeOfEatingList}
              topic="시간대"
              type="timeOfEatingList"
              checkBoxOptionHandler={checkBoxOptionHandler}
            />
            <RadioButtonList
              list={options.wayOfEatingList}
              topic="배달여부"
              type="wayOfEatingList"
              radioOption={radioOption}
              radioOptionHandler={radioOptionHandler}
            />
          </div>
        ) : (
          <RadioButtonList
            list={options.typeOfStudyList}
            topic="주제"
            type="typeOfStudyList"
            radioOption={radioOption}
            radioOptionHandler={radioOptionHandler}
          />
        )}
        <div className="option-field">
          <h2>날짜</h2>
          <DatePicker
            dateFormat="yyyy년 MM월 dd일"
            locale={ko}
            minDate={new Date()}
            selected={bookingDate}
            onChange={setBookingDate}
          />
        </div>
        <div className="option-field">
          <h2>모집 인원</h2>
          <TextField
            style={{ width: '100px' }}
            size="small"
            type="number"
            value={article.participantNumMax}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={(e) => {
              setArticle(
                produce(article, (draft) => {
                  draft.participantNumMax = Math.max(
                    1,
                    parseInt(e.target.value, 10),
                  )
                    .toString()
                    .slice(0, 3);
                }),
              );
            }}
          />
        </div>
      </div>
      <TextField
        sx={textFieldStyle}
        fullWidth
        placeholder="방 설명을 입력해 주세요 (필수)"
        multiline
        inputProps={{ maxLength: 100 }}
        value={article.content}
        name="content"
        onChange={articleHandler}
      />
      <div className="button-wrapper">
        <CustomColorButton
          button={
            <Button
              className="button"
              variant="contained"
              onClick={editMode ? editRoomHandler : createRoomHandler}
              disabled={!checkWritable}
            >
              {editMode ? '수정' : '게시'}
            </Button>
          }
        />
        <Button
          style={{ background: '#cccccc', color: 'black' }}
          className="button"
          variant="contained"
          onClick={onClose}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

CreateRoomForm.propTypes = {
  articleId: PropTypes.string,
  topic: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

CreateRoomForm.defaultProps = {
  articleId: '',
};

export default CreateRoomForm;
