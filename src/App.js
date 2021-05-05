import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NbrOfEvents';

function App() {
  return (
    <div className="App">
      <CitySearch/>
      <NumberOfEvents />
      <EventList events={[]}/>
    </div>
  );
}

export default App;
