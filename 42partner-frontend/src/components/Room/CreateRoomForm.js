import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import '../../styles/CreateRoomForm.scss';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import 'react-datepicker/dist/react-datepicker.css';

const textFieldStyle = {
  mb: 2,
};

const CreateRoomForm = () => {
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
            <FormControlLabel value="배달" control={<Radio />} label="배달" />
            <FormControlLabel value="도보" control={<Radio />} label="도보" />
            <FormControlLabel value="기타" control={<Radio />} label="기타" />
          </RadioGroup>
        </div>
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
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default CreateRoomForm;
