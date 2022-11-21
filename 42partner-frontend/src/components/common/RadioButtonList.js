import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const RadioButtonList = ({
  list,
  topic,
  type,
  radioOption,
  radioOptionHandler,
}) => {
  const buttonList = list.map((op) => (
    <FormControlLabel
      key={op.value}
      control={<Radio value={op.value} name={type} />}
      label={op.label}
    />
  ));

  return (
    <div className="option-field">
      <h2>{topic}*</h2>
      <RadioGroup row value={radioOption} onChange={radioOptionHandler}>
        {buttonList}
      </RadioGroup>
    </div>
  );
};

RadioButtonList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  topic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  radioOption: PropTypes.string.isRequired,
  radioOptionHandler: PropTypes.func.isRequired,
};

export default RadioButtonList;
