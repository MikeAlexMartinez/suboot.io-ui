/* eslint-disable react/prop-types */

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithToolTip = Slider.createSliderWithTooltip;
const Range = createSliderWithToolTip(Slider.Range);
const Handle = Slider.Handle;

const rangeStyle = { width: 400, margin: 50, display: 'inline-block' };

function log(value) {
  console.log(value);
}

const buttonStyles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const sliderOptions = [
  {
    name: 'All', 
    active: true
  }, {
    name: 'To',
    active: false
  }, {
    name: 'Range',
    active: false
  }, {
    name: 'Last N',
    active: false
  }
];

const SliderButtons = withStyles(buttonStyles)((props) => {
  const { classes, options } = props;
  return (
    <div>
      {options.map((opt) => {
        return (
          <Button 
            key={opt.name.replace(' ', '-').toLowerCase()}
            variant="raised"
            size="small"
            color={opt.active ? 'primary' : 'default'} 
            className={classes.button}
          >
            {opt.name}
          </Button>
        );
      })}
    </div>
  );
});

const handle = (props) => {
  const {value, dragging, index, ...restProps} = props;
  return (
    <Tooltip
      prefixCls='rc-slider-tooltip'
      overlay={value}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class GameweekRange extends React.Component {
  render() {
    return (
      <div>
        <SliderButtons options={sliderOptions} />
        <div style={rangeStyle}>
          <Range 
            allowCross={false}
            pushable={true}
            defaultValue={[0,31]}
            onChange={log}
            handle={handle}
            max={31}
          />
        </div>
      </div>
    );
  }
}

export default GameweekRange;