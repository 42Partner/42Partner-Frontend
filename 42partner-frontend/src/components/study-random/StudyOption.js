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

const StudyOption = () => {
  return (
    <div className="option-wrapper">
      <h3 className="option-description" style={{ paddingTop: 20 }}>
        랜덤 매칭을 기다리는 사용자는 nn명 입니다.
      </h3>
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
      <div className="option-what">
        <span className="tag">What ?</span>
        <div className="option-group">
          <FormGroup row aria-labelledby="what" name="what">
            <FormControlLabel
              value="42subject"
              control={<Checkbox />}
              label="42과제"
            />
            <FormControlLabel value="etc" control={<Checkbox />} label="기타" />
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

export default StudyOption;
