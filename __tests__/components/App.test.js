import React from 'react';
import App from '../../app/components/App';

import { shallow } from 'enzyme';

describe('<App />', () => {

  test('should render app', () => {

    const wrapper = shallow(<App />);
    expect(wrapper.contains(<div className='app'>Hello World!</div>))
      .toEqual(true);
  });

});