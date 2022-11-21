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
} from '../../modules/rooms';
import CheckBoxList from '../common/CheckBoxList';
import RadioButtonList from '../common/RadioButtonList';
import CustomPinkButton from '../common/CustomPinkButton';

const textFieldStyle = {
  mb: 2,
};

const CreateRoomForm = ({ articleId, topic, onClose, editMode }) => {
  const dispatch = useDispatch();
  const { articleInfo } = useSelector(({ rooms }) => ({
    articleInfo: rooms.articleInfo,
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
  const [anoChecked, setAnoChecked] = useState(false);
  const [article, setArticle] = useState({
    anonymity: false,
    content: '',
    contentCategory: topic,
    date: new Date(),
    matchConditionDto: null,
    participantNumMax: 1,
    title: '',
  });

  useEffect(() => {
    console.log(options);
  }, [options]);

  const anoCheckedHander = (e) => {
    setArticle({
      ...article,
      anonymity: anoChecked,
    });
    setAnoChecked(e.target.checked);
  };

  const articleHandler = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setArticle({ ...article, [name]: value });
  };

  const checkData = (name, value, checked) => {
    console.log(name, value, checked);
    setOptions(
      produce(options, (draft) => {
        const option = draft[name].find((op) => op.value === value);
        option.checked = !option.checked;
      }),
    );

    if (checked && matchingOption[name].indexOf(value) === -1) {
      setMatchingOption({
        ...matchingOption,
        [name]: matchingOption[name].concat(value),
      });
    } else if (!checked) {
      setMatchingOption({
        ...matchingOption,
        [name]: matchingOption[name].filter((op) => op !== value),
      });
    }
  };

  const checkBoxOptionHandler = (e) => {
    const { name, value, checked } = e.target;
    console.log(e);
    checkData(name, value, checked);
  };

  const radioOptionHandler = (e) => {
    const { name, value } = e.target;
    setRadioOption(value);
    setMatchingOption({
      ...matchingOption,
      [name]: matchingOption[name].concat(value),
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
  };

  const editRoomHandler = () => {
    dispatch(editRoom({ article, articleId }));
    dispatch(changeEditMode(false));
    onClose();
  };

  const initCheckBoxOptions = () => {
    const { matchConditionDto } = articleInfo;

    for (let i = 0; i < 2; ) {
      const name = Object.keys(matchConditionDto)[i];
      for (let j = 0; j < matchConditionDto[name].length; ) {
        const element = matchConditionDto[name][j];
        checkData(name, element, true);
        j += 1;
      }
      i += 1;
    }
  };

  const initData = () => {
    setAnoChecked(articleInfo.anonymity);
    setArticle({
      ...article,
      anonymity: articleInfo.anonymity,
      content: articleInfo.content,
      contentCategory: articleInfo.contentCategory,
      date: articleInfo.date,
      participantNumMax: articleInfo.participantNumMax,
      title: articleInfo.title,
    });

    if (articleInfo.contentCategory === 'MEAL') {
      setRadioOption(articleInfo.matchConditionDto.wayOfEatingList);
    } else {
      setRadioOption(articleInfo.matchConditionDto.typeOfStudyList);
    }

    initCheckBoxOptions();
  };

  useEffect(() => {
    if (editMode) {
      dispatch(loadArticleInfo({ articleId }));
    }
  }, []);

  useEffect(() => {
    checkFillData();
    // console.log(article);
  }, [article]);

  useEffect(() => {
    if (editMode && articleInfo !== null) {
      initData();
    }
  }, [articleInfo]);

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
        control={<Checkbox checked={anoChecked} />}
        value={article.anonymity}
        onChange={anoCheckedHander}
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
        <CustomPinkButton
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
