import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ForecastSection from './ForecastSection';

describe('<ForecastSection />', () => {
  it('should display the section title', () => {
    const title = 'Section Title';

    const wrapper = shallow(<ForecastSection title={title} />);
    const sectionTitle = wrapper
      .find('h2.title')
      .first()
      .text();

    expect(sectionTitle).to.equal(title);
  });
});
