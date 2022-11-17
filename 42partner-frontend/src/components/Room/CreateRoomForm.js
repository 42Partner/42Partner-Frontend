import React, { useState } from 'react';
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
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/CreateRoomForm.scss';

const textFieldStyle = {
  mb: 2,
};

const CreateRoomForm = ({ isMeal, open, onClose }) => {
  const [bookingDate, setBookingDate] = useState(new Date());

  return (
    <div className="create-room-form">
      <TextField
        required
        fullWidth
        sx={textFieldStyle}
        className="title-text"
        variant="standard"
        placeholder="제목을 입력해 주세요"
        inputProps={{ maxLength: 20 }}
      />
      <div className="check-option-wrapper">
        <div className="option-field">
          <h2>날짜</h2>
          <DatePicker
            dateFormat="yyyy년 MM월 dd일"
            minDate={new Date()}
            selected={bookingDate}
            locale={ko}
            onChange={(date) => setBookingDate(date)}
          />
        </div>
        <div className="option-field">
          <h2>장소</h2>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="개포" />
            <FormControlLabel control={<Checkbox />} label="서초" />
            <FormControlLabel control={<Checkbox />} label="기타 (외부)" />
          </FormGroup>
        </div>
        {isMeal ? (
          <div>
            <div className="option-field">
              <h2>시간대</h2>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="아침" />
                <FormControlLabel control={<Checkbox />} label="점심" />
                <FormControlLabel control={<Checkbox />} label="저녁" />
                <FormControlLabel control={<Checkbox />} label="야식" />
              </FormGroup>
            </div>
            <div className="option-field">
              <h2>배달여부</h2>
              <RadioGroup row name="takeout-radio-group">
                <FormControlLabel
                  value="DELIVERY"
                  control={<Radio />}
                  label="배달"
                />
                <FormControlLabel
                  value="EATOUT"
                  control={<Radio />}
                  label="도보"
                />
                <FormControlLabel
                  value="TAKEOUT"
                  control={<Radio />}
                  label="기타"
                />
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className="option-field">
            <h2>배달여부</h2>
            <RadioGroup row name="takeout-radio-group">
              <FormControlLabel
                value="INNER_CIRCLE"
                control={<Radio />}
                label="본 과정"
              />
              <FormControlLabel
                value="NOT_INNER_CIRCLE"
                control={<Radio />}
                label="비본 과정"
              />
            </RadioGroup>
          </div>
        )}
      </div>
      <div className="textarea-wrapper">
        <TextField
          sx={textFieldStyle}
          fullWidth
          placeholder="방 설명을 입력해 주세요"
          multiline
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          fullWidth
          sx={textFieldStyle}
          placeholder="해시태크를 입력해 주세요"
          inputProps={{ maxLength: 30 }}
        />
        <span style={{ color: '#218aff' }}>#test #test #test</span>
      </div>
      <div className="button-wrapper">
        <Button id="button" variant="contained">
          게시
        </Button>
        <Button
          style={{ background: '#cccccc', color: 'black' }}
          id="button"
          variant="contained"
          open={open}
          onClick={onClose}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

CreateRoomForm.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateRoomForm;
