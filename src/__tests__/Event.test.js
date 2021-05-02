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

    // beforeEach(() => {
    //     EventWrapper.setState({
    //         showDetails: false
    //     });
    // });
  
    test('render correct event details', () => {
      expect(EventWrapper.find('.event-container')).toHaveLength(1);
    });
  
    test('render show event-details', () => {
      EventWrapper.setState({ showDetails: true });
      EventWrapper.find('.show-details-btn').simulate('click');
    });
  
    test('render hide event-details', () => {
      EventWrapper.setState({ showDetails: false });
      EventWrapper.find('.show-details-btn').simulate('click');
    });
});
