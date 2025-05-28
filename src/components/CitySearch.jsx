import React, { useState, useEffect } from 'react'

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleInputChanged = (event) => {
    const value = event.target.value
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1
        })
      : []

    setQuery(value)
    setSuggestions(filteredLocations)

    let infoText
    if (filteredLocations.length === 0) {
      infoText =
        'We can not find the city you are looking for. Please try another city'
    } else {
      infoText = ''
    }
    setInfoAlert(infoText)
  }

  useEffect(() => {
    setSuggestions(allLocations)
  }, [`${allLocations}`])

  const handleItemClicked = (event) => {
    const value = event.target.textContent
    setQuery(value)
    setShowSuggestions(false) // to hide the list
    setCurrentCity(value)
    setInfoAlert('')
  }

  return (
    <div className="form-wrapper">
      <div id="city-search" className="form-group">
        <label htmlFor="city">Choose a city close to you </label>
        <input
          type="text"
          id="city"
          className="input"
          placeholder="Search for a city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
        {showSuggestions && (
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            ))}
            <li key="See all cities" onClick={handleItemClicked}>
              <b>See all cities</b>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default CitySearch
