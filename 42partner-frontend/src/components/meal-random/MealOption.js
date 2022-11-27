import React from 'react';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from '@material-ui/core/index';
import '../../styles/Option.scss';

const MealOption = () => {
  return (
    <div className="option-wrapper">
      <h3 className="option-description">
        랜덤 매칭을 기다리는 사용자는 nn명 입니다.
      </h3>
      <div className="option-when">
        <span className="tag">When ?</span>
      </div>
      <div className="option-where">
        <span className="tag">Where ?</span>
        <div className="option-group">
          <RadioGroup row aria-labelledby="where" name="where">
            <FormControlLabel value="gaepo" control={<Radio />} label="개포" />
            <FormControlLabel value="secho" control={<Radio />} label="서초" />
            <FormControlLabel value="etc" control={<Radio />} label="기타" />
          </RadioGroup>
        </div>
      </div>
      <div className="option-how">
        <span className="tag">How ?</span>
        <div className="option-group">
          <FormGroup row aria-labelledby="how" name="how">
            <FormControlLabel
              value="togo"
              control={<Checkbox />}
              label="도보"
            />
            <FormControlLabel
              value="delivery"
              control={<Checkbox />}
              label="배달"
            />
          </FormGroup>
        </div>
      </div>
      <div className="option-btn">
        <Button style={{ marginRight: 20, backgroundColor: '#dee1e3' }}>
          초기화
        </Button>
        <Button style={{ backgroundColor: 'lightpink' }}>매칭</Button>
      </div>
    </div>
  );
};

export default MealOption;
