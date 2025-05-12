import React, { useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import mockData from './mock-data';

const App = ({ events = mockData }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  
  // Ensure the events are sliced based on the current number of events
  const displayedEvents = events.slice(0, numberOfEvents);

  return (
    <div>
      <CitySearch />
      <NumberOfEvents number={numberOfEvents} onNumberChange={setNumberOfEvents} />
      <EventList events={displayedEvents} />
    </div>
  );
};

export default App;
