import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api'

import'./App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [ currentNOE, currentCity]);

  // const fetchData = async () => {
  //   const allEvents = await getEvents();
  //   const filteredEvents = currentCity === "See all cities" 
  //     ? allEvents 
  //     : allEvents.filter(event => event.location === currentCity)
  //     console.log(filteredEvents)
  //   setEvents(filteredEvents.slice(0, currentNOE));
  //   setAllLocations(extractLocations(allEvents));
  // }
  const fetchData = async () => {
    const allEvents = await getEvents();
  
    if (!Array.isArray(allEvents) || allEvents.length === 0) {
      console.warn("No valid events returned from API.");
      setEvents([]);
      return;
    }
  
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
  
    console.log("Filtered Events:", filteredEvents);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };
  
  

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents number ={currentNOE} onNumberChange={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
 
};

export default App;
