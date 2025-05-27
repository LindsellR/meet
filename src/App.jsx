import React, { useState, useEffect } from 'react'
import CitySearch from './components/CitySearch'
import EventList from './components/EventList'
import NumberOfEvents from './components/NumberOfEvents'
import { extractLocations, getEvents } from './api'
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert'

import './App.css'

const App = () => {
  const [allLocations, setAllLocations] = useState([])
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32)
  const [events, setEvents] = useState([])
  const [currentCity, setCurrentCity] = useState('See all cities')
  const [infoAlert, setInfoAlert] = useState('')
  const [errorAlert, setErrorAlert] = useState('')
  const [warningAlert, setWarningAlert] = useState('')

  useEffect(()=> {
    fetchData()
  }, [currentNumberOfEvents, currentCity]);
  
  // Listen to online/offline status
  useEffect(() => {
    const handleOffline = () =>
      setWarningAlert('You are currently offline. The displayed list may not be up to date.');
    const handleOnline = () => setWarningAlert('');

    // Check initial state
    if (!navigator.onLine) handleOffline();

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents()
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity)

    setEvents(filteredEvents.slice(0, currentNumberOfEvents))
    setAllLocations(extractLocations(allEvents))
  }

  return (
    <div className="App">
      <header>
        <h1>Welcome to My Meet App</h1>
      </header>

      <div className="alerts-container">
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
        {errorAlert.length > 0 && <ErrorAlert text={errorAlert} />}
        {warningAlert.length > 0 && <WarningAlert text={warningAlert} />}
      </div>

      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />

      <NumberOfEvents
        number={currentNumberOfEvents}
        onNumberChange={setCurrentNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
      <EventList events={events} />
    </div>
  );
};

export default App
