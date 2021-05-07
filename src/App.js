import './nprogress.css';
import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NbrOfEvents';
import { getEvents,extractLocations } from './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventValue: 32
  }

  updateEvents = (location, eventValue ) => {
    getEvents().then((events) => {
      const eventCount = eventValue || this.state.eventValue;
      const locationEvents = (location === 'all') ? events: events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        eventValue : eventCount
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ 
        events: events.slice(0, this.state.eventValue), 
        locations : extractLocations(events),
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

// function App() {
//   return (
//     <div className="App">
//       <CitySearch/>
//       <NumberOfEvents />
//       <EventList events={[]}/>
//     </div>
//   );
// }

export default App;
