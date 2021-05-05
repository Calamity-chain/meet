import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    const event = mockData[0];
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
    });

    test('render event element', () => {
      expect(EventWrapper.find('.event-container')).toHaveLength(1);
  });

    test('render event location', () => {
      expect(EventWrapper.find('.locations')).toHaveLength(1);
    });

    test('render show details button', () => {
      expect(EventWrapper.find('.show-details-btn')).toHaveLength(1);
    });
  
    test('render correct event details', () => {
      expect(EventWrapper.find('.event-container')).toHaveLength(1);
    });
  
    
    test('render show/hide event-details by clicking button', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
      //simulates click
      EventWrapper.find('.show-details-btn').simulate('click');
      //checks that the event-details are now visible
      expect(EventWrapper.find('.event-details')).toHaveLength(1);
      EventWrapper.find('.show-details-btn').simulate('click');
      //checks that the event-details are now hidden
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
    });

});
