import './nprogress.css';
import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NbrOfEvents';
import { getEvents, extractLocations } from './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventValue: 32,
    selectedCity: 'all'
  }

  updateEvents = (location, eventCount ) => {
    const { selectedCity, eventValue } = this.state;
		if (location) {
			getEvents().then((events) => {
				const locationEvents =
				location === 'all' ? events : events.filter((event) => event.location === location);
				const filteredEvents = locationEvents.slice(0, eventValue);
				this.setState({
					events: filteredEvents,
					selectedCity: location,
				});
			});
		} else {
			getEvents().then((events) => {
				const locationEvents =
				selectedCity === 'all'? events : events.filter((event) => event.location === selectedCity);
				const filteredEvents = locationEvents.slice(0, eventCount);
				this.setState({
					events: filteredEvents,
					eventValue: eventCount,
				});
			});
		}
	};

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ 
        events, 
        locations : extractLocations(events)
      });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
  return (
    <div className="App">
      <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
      <NumberOfEvents eventValue={this.state.eventValue} updateEvents={this.updateEvents}/>
      <EventList events={this.state.events}/>
    </div>
  );
  }
}


export default App;
