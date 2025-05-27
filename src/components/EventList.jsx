// src/components/EventList.jsx
import React from 'react'
import Event from './Event'

const EventList = ({ events = [] }) => (
  <ul id="event-list">
    <h2>Events</h2>
    {events.map((event) => (
      <Event key={event.id} event={event} />
    ))}
  </ul>
)

export default EventList
