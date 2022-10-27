import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import '../../styles/CreateRoomForm.scss';

const textFieldStyle = {
  mb: 2,
};

const CreateRoomForm = () => {
  const [place, setPlace] = useState('');

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div className="create-room-form">
      <TextField
        required
        fullWidth
        sx={textFieldStyle}
        id="title-text"
        variant="standard"
        placeholder="제목을 입력해 주세요"
        inputProps={{ maxLength: 20 }}
      />
      <div className="check-option-wrapper">
        <div id="option-field">
          <h2>장소</h2>
          <FormControl>
            <Select
              required
              id="place-select"
              value={place}
              onChange={handlePlaceChange}
              displayEmpty
            >
              <MenuItem disabled value="">
                장소 선택
              </MenuItem>
              <MenuItem value="개포">개포</MenuItem>
              <MenuItem value="서초">서초</MenuItem>
              <MenuItem value="기타">기타</MenuItem>
              <MenuItem value="상관없음">상관없음</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="option-field">
          <h2>시간대</h2>
          <RadioGroup row name="time-radio-group">
            <FormControlLabel value="아침" control={<Radio />} label="아침" />
            <FormControlLabel value="점심" control={<Radio />} label="점심" />
            <FormControlLabel value="저녁" control={<Radio />} label="저녁" />
            <FormControlLabel value="야식" control={<Radio />} label="야식" />
          </RadioGroup>
        </div>
        <div id="option-field">
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
          id="room-textarea"
          placeholder="방 설명을 입력해 주세요"
          multiline
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          fullWidth
          sx={textFieldStyle}
          id="room-textarea"
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
