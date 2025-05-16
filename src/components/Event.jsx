import React, { useState } from 'react'

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <li data-testid="event" class="event">
      <h3>{event.summary}</h3>

      <p data-testid="event-start">
        Starts at: {new Date(event.start.dateTime).toLocaleString()}
      </p>

      <p data-testid="event-location">Location: {event.location}</p>

      <button
        class="details-btn"
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
        data-testid="toggle-details"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div class="description" data-testid="event-description">
          <p>{event.description}</p>
          <p>{event.location}</p>
        </div>
      )}
    </li>
  )
}

export default Event
