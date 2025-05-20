import React, { useState, useEffect } from 'react'
import CitySearch from './components/CitySearch'
import EventList from './components/EventList'
import NumberOfEvents from './components/NumberOfEvents'
import { extractLocations, getEvents } from './api'

import './App.css'

const App = () => {
  const [allLocations, setAllLocations] = useState([])
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32)
  const [events, setEvents] = useState([])
  const [currentCity, setCurrentCity] = useState('See all cities')

  useEffect(() => {
    fetchData()
  }, [currentNumberOfEvents, currentCity])

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
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents
        number={currentNumberOfEvents}
        onNumberChange={setCurrentNumberOfEvents}
      />
      <EventList events={events} />
    </div>
  )
}
 
export default App
