import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Event from '../components/Event'
import mockData from '../mock-data'

// Use the first event from mock-data
const sampleEvent = mockData[0]

describe('Event component', () => {
  test("by default, event's details section should be hidden", () => {
    render(<Event event={sampleEvent} />)

    // Check title is rendered
    expect(screen.getByText('Learn JavaScript')).toBeInTheDocument()

    // Details should be hidden
    expect(screen.queryByTestId('event-description')).not.toBeInTheDocument()

    // Show Details button should be visible
    expect(screen.getByText('Show Details')).toBeInTheDocument()
  })

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    render(<Event event={sampleEvent} />)

    // Click to show details
    fireEvent.click(screen.getByText('Show Details'))

    // Expect description to appear
    expect(await screen.findByTestId('event-description')).toBeInTheDocument()

    // Hide Details button should be visible
    expect(screen.getByText('Hide Details')).toBeInTheDocument()
  })

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    render(<Event event={sampleEvent} />)

    // Show details first
    fireEvent.click(screen.getByText('Show Details'))
    expect(await screen.findByTestId('event-description')).toBeInTheDocument()

    // Click to hide details
    fireEvent.click(screen.getByText('Hide Details'))

    // Description should disappear
    expect(screen.queryByTestId('event-description')).not.toBeInTheDocument()

    // Show Details button should be visible again
    expect(screen.getByText('Show Details')).toBeInTheDocument()
  })

  test('displays event start time and location', () => {
    render(<Event event={sampleEvent} />)

    // Check start time is displayed
    const expectedStart = new Date(sampleEvent.start.dateTime).toLocaleString()
    expect(screen.getByTestId('event-start')).toHaveTextContent(
      `Starts at: ${expectedStart}`
    )

    // Check location is displayed
    expect(screen.getByTestId('event-location')).toHaveTextContent(
      `Location: ${sampleEvent.location}`
    )
  })
})
