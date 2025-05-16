import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getEvents } from '../api'
import App from '../App'
import mockData from '../mock-data'

let container

describe('<App /> component', () => {
  beforeEach(() => {
    const renderResult = render(<App events={mockData} />)
    container = renderResult.container
  })

  test('renders list of events', () => {
    expect(container.querySelector('#event-list')).toBeInTheDocument()
  })

  test('renders CitySearch', () => {
    expect(container.querySelector('#city-search')).toBeInTheDocument()
  })

  test('renders NumberOfEvents component', () => {
    expect(container.querySelector('#number-of-events')).toBeInTheDocument()
  })

  test('shows 32 events by default when user opens the app', async () => {
    const events = await screen.findAllByRole('listitem')
    expect(events.length).toBeLessThanOrEqual(32)
  })

  test('shows the number of events specified by the user', async () => {
    const input = screen.getByTestId('number-input')
    fireEvent.change(input, { target: { value: '10' } })

    await waitFor(() => {
      const events = screen.getAllByRole('listitem')
      expect(events.length).toBeLessThanOrEqual(10)
    })
  })
})

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup()
    const AppComponent = render(<App />)
    const AppDOM = AppComponent.container.firstChild

    const CitySearchDOM = AppDOM.querySelector('#city-search')
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox')

    await user.type(CitySearchInput, 'Berlin')
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany')
    await user.click(berlinSuggestionItem)

    const EventListDOM = AppDOM.querySelector('#event-list')
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem')

    const allEvents = await getEvents()

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany')
    })
  })
})
