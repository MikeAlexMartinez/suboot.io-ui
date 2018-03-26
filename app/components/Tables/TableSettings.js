/* eslint-disable react/prop-types */

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React from 'react';
import Button from 'material-ui/Button';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithToolTip = Slider.createSliderWithTooltip;
const Range = createSliderWithToolTip(Slider.Range);
const Handle = Slider.Handle;

const rangeStyle = { 
  width: '40%',
  marginLeft: 20,
  marginRight: 20,
  display: 'inline-block',
};

const fixtureTypes = [
  {
    name: 'All',
    active: true,
  }, {
    name: 'Home',
    active: false,
  }, {
    name: 'Away',
    active: false,
  }
];

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

const SliderButtons = (props) => {
  const { options, changeValue } = props;
  return (
    <div className={`range-options ${props.position}`}>
      {options.map((opt) => {
        return (
          <Button 
            key={opt.name.replace(' ', '-').toLowerCase()}
            variant="raised"
            size="small"
            color={opt.active ? 'primary' : 'default'}
            styles={{marginLeft: '5px'}}
            onClick={() => changeValue(opt.name.replace(' ','-').toLowerCase())}
          >
            {opt.name}
          </Button>
        );
      })}
    </div>
  );
};

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

class TableSettings extends React.Component {
  render() {
    const {rangeStart, rangeEnd, 
      rangeClick, fixturesClick, setRange} = this.props;
    return (
      <div className='table-settings'>
        <SliderButtons 
          options={sliderOptions} 
          position='left' 
          changeValue={rangeClick}
        />
        <div style={rangeStyle}>
          <Range 
            allowCross={false}
            pushable={true}
            defaultValue={[rangeStart,rangeEnd]}
            onAfterChange={(values) => setRange(values)}
            handle={handle}
            max={31}
            railStyle={{
              backgroundColor: '##00766c',
            }}
            dotStyle={{
              backgroundColor: '##00766c',
            }}
          />
        </div>
        <SliderButtons 
          options={fixtureTypes}
          position='right'
          changeValue={fixturesClick}
        />
      </div>
    );
  }
}

export default TableSettings;