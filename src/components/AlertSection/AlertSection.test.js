import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AlertSection from './AlertSection';
import Alert from '../Alert/Alert';

describe('<AlertSection />', () => {
  it('should render an Alert for each alert', () => {
    const alerts = [
      { time: 1, title: 'Alert 1' },
      { time: 2, title: 'Alert 2' },
      { time: 3, title: 'Alert 3' },
    ];

    const wrapper = shallow(<AlertSection alerts={alerts} />);

    expect(wrapper.find(Alert)).to.have.length(3);
  });
});
