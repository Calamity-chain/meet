import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import EventList from "../EventList";
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  let EventListWrapper;
  let EventWrapper;
  let AppWrapper;

  test('An event element is collapsed by default', ({ given, and, when, then }) => {
    given('the page has fully loaded the events', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    and('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user opens the application', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });

    then('the user should see all the events in the city but not the details', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event-details")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the event detail is true', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('user click the event', () => {
      EventWrapper.find(".show-details-btn").simulate("click");
    });

    then('event box expands and shows the details', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    given('event details box has expanded', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find(".show-details-btn").simulate("click");
    });

    when('the user clicks the collapse button', () => {
      EventWrapper.find(".show-details-btn").simulate("click");
    });

    then('event box collapses and hides the details', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });
  });

});
