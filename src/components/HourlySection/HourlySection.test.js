import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import HourlySection from './HourlySection';
import HourlyRow from '../HourlyRow/HourlyRow';

describe('<HourlySection />', () => {
  it('should render an HourlySection for each hour', () => {
    const data = {
      data: [{ time: 1, icon: 'test1' }, { time: 2, icon: 'test2' }],
    };
    const wrapper = shallow(<HourlySection data={data} />);

    expect(wrapper.find(HourlyRow)).to.have.length(2);
  });
  it('should only render up to 12 HourlySections', () => {
    const data = {
      data: [
        { time: 1 },
        { time: 2 },
        { time: 3 },
        { time: 4 },
        { time: 5 },
        { time: 6 },
        { time: 7 },
        { time: 8 },
        { time: 9 },
        { time: 10 },
        { time: 11 },
        { time: 12 },
        { time: 13 },
      ],
    };
    const wrapper = shallow(<HourlySection data={data} />);

    expect(wrapper.find(HourlyRow)).to.have.length(12);
  });
});
