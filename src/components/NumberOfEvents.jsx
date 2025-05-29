import React, { useState, useEffect } from 'react'

const NumberOfEvents = ({ number, onNumberChange, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(number.toString())

  useEffect(() => {
    setInputValue(number.toString())
  }, [number])

  const handleInputChanged = (event) => {
    const value = event.target.value
    setInputValue(value)

    const intValue = parseInt(value, 10)

    if (value === '') {
      setErrorAlert?.('Please enter a positive number') // handle no input
    } else if (isNaN(intValue) || intValue <= 0) {
      setErrorAlert?.('Please enter a number')
    } else {
      setErrorAlert?.('') // Clear error
      onNumberChange(intValue)
    }
  }

  return (
    <div className="form-wrapper">
      <div id="number-of-events">
        <label htmlFor="event-count">Number of events displayed</label>
        <input
          type="text"
          inputMode="numeric"
          id="event-count"
          aria-label="Number of events"
          data-testid="number-input"
          value={inputValue}
          onChange={handleInputChanged}
          min="1"
          className="input input--small"
        />
      </div>
    </div>
  )
}

export default NumberOfEvents
