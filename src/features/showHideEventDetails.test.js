import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App'; // Your full app

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has opened the app and chosen a city to find events', async () => {
      render(<App />);
      // wait for events to load
      await waitFor(() => expect(screen.getAllByTestId('event').length).toBeGreaterThan(0));
    });

    when('the list of events is displayed', () => {
      // nothing needed, already handled in given
    });

    then('each event element should be collapsed by default and the event details should not be visible', () => {
      const descriptions = screen.queryAllByTestId('event-description');
      expect(descriptions.length).toBe(0);
    });
  });

  test('The User can expand an event to see details', ({ given, when, then }) => {
    let toggleButton;
  
    given('that the user is viewing a list of collapsed events', async () => {
      render(<App />);
      await waitFor(() => expect(screen.getAllByTestId('event').length).toBeGreaterThan(0));
      const toggleButtons = screen.getAllByTestId('toggle-details');
      toggleButton = toggleButtons[0]; // pick the first event
    });
  
    when('the user clicks on the "Show Details" button of an event', async () => {
      await user.click(toggleButton);
    });
  
    then('the details of that event should be displayed', () => {
      const description = screen.getByTestId('event-description');
      expect(description).toBeInTheDocument();
    });
  });
  

  test('The User can collapse an event to hide details', ({ given, when, then }) => {
    let toggleButton;

    given('the user has expanded an event to view its details', async () => {
        render(<App />);
        await waitFor(() => expect(screen.getAllByTestId('event')).not.toHaveLength(0));
        
        const toggleButtons = screen.getAllByTestId('toggle-details');
        const toggleButton = toggleButtons[0];
        await user.click(toggleButton);
      });
      

    when('the user clicks on the "Hide Details" button of that event', async () => {
      await user.click(toggleButton);
    });

    then("the details of that event should be hidden and the event should display it's collapsed default state.", () => {
      const description = screen.queryByTestId('event-description');
      expect(description).not.toBeInTheDocument();
    });
  });
});
