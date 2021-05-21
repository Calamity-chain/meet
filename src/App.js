import './nprogress.css';
import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NbrOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventValue: 32,
    selectedCity: 'all'
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  };

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
  const { locations, eventValue, events } = this.state;
  return (
    <div className="App">
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <CitySearch locations={locations} updateEvents={this.updateEvents} />
      <NumberOfEvents eventValue={eventValue} updateEvents={this.updateEvents}/>
      
      <div className="data-vis-wrapper">
      <h4 className="chart-label">Frequency of Event by Type:</h4>
      <EventGenre 
            events={events}
            locations={locations}
      />
      <h4 className="chart-label">Events in each city</h4>  
      <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <EventList events={events}/>
    </div>
  );
  }
}


export default App;
