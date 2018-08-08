import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DailySection from './DailySection';
import DailyRow from '../DailyRow/DailyRow';

describe('<DailySection />', () => {
  it('should render an DailyRow for each day', () => {
    const data = {
      summary: 'Summary of the week',
      data: [
        {
          time: 1,
          icon: 'clear-day',
          summary: 'Clear Day',
          temperatureMax: 99,
          temperatureMin: 75,
        },
        {
          time: 2,
          icon: 'clear-day',
          summary: 'Clear Day',
          temperatureMax: 99,
          temperatureMin: 75,
        },
        {
          time: 3,
          icon: 'clear-day',
          summary: 'Clear Day',
          temperatureMax: 99,
          temperatureMin: 75,
        },
      ],
    };

    const wrapper = shallow(<DailySection data={data} />);

    expect(wrapper.find(DailyRow)).to.have.length(3);
  });
  it('should display the summary for the week', () => {
    const data = {
      summary: 'Summary of the week',
      data: [],
    };

    const wrapper = shallow(<DailySection data={data} />);
    const summaryText = wrapper
      .find('p')
      .first()
      .text();

    expect(summaryText).to.equal(data.summary);
  });
});
