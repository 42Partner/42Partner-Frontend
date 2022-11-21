import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBoxList = ({ list, topic, type, checkBoxOptionHandler }) => {
  const checkBoxList = list.map((op) => (
    <FormControlLabel
      key={op.value}
      control={
        <Checkbox
          checked={op.checked}
          value={op.value}
          onClick={(e) => checkBoxOptionHandler(e)}
          name={type}
        />
      }
      label={op.label}
    />
  ));

  return (
    <div className="option-field">
      <h2>{topic}*</h2>
      <FormGroup row>{checkBoxList}</FormGroup>
    </div>
  );
};

CheckBoxList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  topic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checkBoxOptionHandler: PropTypes.func.isRequired,
};

export default CheckBoxList;
