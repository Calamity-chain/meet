import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NbrOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

//Unit Tests Scope
describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(()=> {
    AppWrapper = shallow(<App/>);
  });
      test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
      });

      test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
      });

      test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

//Integration Tests Scope
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events when users selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });
  test('App passes "eventValue" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state('eventValue');
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().eventValue).toEqual(AppNumberState);
    AppWrapper.unmount();
  });
  test('change number of events displayed according to user input', () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    NumberOfEventsWrapper.setState({ eventValue : 32 });
    const eventObject = { target: { value: 1 } };
    NumberOfEventsWrapper.find('.event-number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventValue')).toBe(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(null, 1);
    AppWrapper.unmount();
  })
});