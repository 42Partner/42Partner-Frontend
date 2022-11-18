import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import PropTypes from 'prop-types';
import produce from 'immer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/CreateRoomForm.scss';
import { createRoom, loadArticleInfo } from '../../modules/rooms';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffbfbf',
    },
  },
});

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
  const [matchConditionDto, setMatchConditionDto] = useState({
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

  const checkBoxOptionHandler = (e) => {
    const { name, value, checked } = e.target;

    setOptions(
      produce(options, (draft) => {
        const option = draft[name].find((op) => op.value === value);
        option.checked = checked;
      }),
    );

    if (checked && matchConditionDto[name].indexOf(value) === -1) {
      setMatchConditionDto({
        ...matchConditionDto,
        [name]: matchConditionDto[name].concat(value),
      });
    } else if (!checked) {
      setMatchConditionDto({
        ...matchConditionDto,
        [name]: matchConditionDto[name].filter((op) => op !== value),
      });
    }
  };

  const radioOptionHandler = (e) => {
    const { name, value } = e.target;
    setRadioOption(value);
    setMatchConditionDto({
      ...matchConditionDto,
      [name]: matchConditionDto[name].concat(value),
    });
  };

  const checkFillData = () => {
    if (article.title === '' || article.content === '') {
      setCheckWritable(false);
      return;
    }

    let len = 0;
    for (let i = 0; i < Object.keys(matchConditionDto).length; ) {
      const name = Object.keys(matchConditionDto)[i];
      if (matchConditionDto[name].length !== 0) {
        len += 1;
      }
      i += 1;
    }

    if (len < 3) {
      setCheckWritable(false);
      return;
    }

    setCheckWritable(true);
  };

  const createRoomHandler = () => {
    dispatch(createRoom({ article }));
    onClose();
  };

  const initData = () => {
    setArticle({
      anonymity: articleInfo.anonymity,
      content: articleInfo.content,
      contentCategory: articleInfo.contentCategory,
      date: articleInfo.date,
      participantNumMax: articleInfo.participantNumMax,
      title: articleInfo.title,
    });
  };

  useEffect(() => {
    if (editMode) {
      dispatch(loadArticleInfo({ articleId }));
    }
  }, []);

  useEffect(() => {
    checkFillData();
  }, [article]);

  useEffect(() => {
    if (editMode && articleInfo !== null) {
      console.log(articleInfo);
      initData();
    }
  }, [articleInfo]);

  useEffect(() => {
    setArticle({
      ...article,
      matchConditionDto,
      date: `${bookingDate.getFullYear()}-${
        bookingDate.getMonth() + 1
      }-${bookingDate.getDate()}`,
    });
  }, [bookingDate, matchConditionDto]);

  return (
    <div className="create-room-form">
      <FormControlLabel
        size="small"
        className="check-option-wrapper"
        control={<Checkbox />}
        value={article.anonymity}
        name="anonymity"
        onChange={articleHandler}
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
        <div className="option-field">
          <h2>장소*</h2>
          <FormGroup row>
            {options.placeList.map((op) => {
              return (
                <FormControlLabel
                  key={op.value}
                  control={
                    <Checkbox
                      checked={op.checked}
                      onChange={checkBoxOptionHandler}
                      value={op.value}
                      name="placeList"
                    />
                  }
                  label={op.label}
                />
              );
            })}
          </FormGroup>
        </div>
        {topic === 'MEAL' ? (
          <div>
            <div className="option-field">
              <h2>시간대*</h2>
              <FormGroup row>
                {options.timeOfEatingList.map((op) => {
                  return (
                    <FormControlLabel
                      key={op.value}
                      control={
                        <Checkbox
                          checked={op.checked}
                          value={op.value}
                          onChange={checkBoxOptionHandler}
                          name="timeOfEatingList"
                        />
                      }
                      label={op.label}
                    />
                  );
                })}
              </FormGroup>
            </div>
            <div className="option-field">
              <h2>배달여부*</h2>
              <RadioGroup row value={radioOption} onChange={radioOptionHandler}>
                {options.wayOfEatingList.map((op) => {
                  return (
                    <FormControlLabel
                      key={op.value}
                      control={
                        <Radio value={op.value} name="wayOfEatingList" />
                      }
                      label={op.label}
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className="option-field">
            <h2>주제*</h2>
            <RadioGroup row value={radioOption} onChange={radioOptionHandler}>
              {options.typeOfStudyList.map((op) => {
                return (
                  <FormControlLabel
                    key={op.value}
                    control={<Radio value={op.value} name="typeOfStudyList" />}
                    value={op.value}
                    label={op.label}
                  />
                );
              })}
            </RadioGroup>
          </div>
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
        <ThemeProvider theme={theme}>
          <Button
            className="button"
            variant="contained"
            onClick={createRoomHandler}
            disabled={!checkWritable}
          >
            게시
          </Button>
        </ThemeProvider>
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
