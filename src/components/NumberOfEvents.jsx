import React, { useState, useEffect } from 'react'

const NumberOfEvents = ({ number, onNumberChange }) => {
  const [inputValue, setInputValue] = useState(number.toString())

  useEffect(() => {
    setInputValue(number.toString())
  }, [number])

  const handleInputChanged = (event) => {
    const value = event.target.value
    setInputValue(value)

    const intValue = parseInt(value, 10)
    if (!isNaN(intValue) && intValue > 0) {
      onNumberChange(intValue)
    }
  }

  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of events</label>
      <input
        type="text"
        inputMode="numeric"
        id="event-count"
        aria-label="Number of events"
        data-testid="number-input"
        value={inputValue}
        onChange={handleInputChanged}
        min="1"
      />
    </div>
  )
}

export default NumberOfEvents
