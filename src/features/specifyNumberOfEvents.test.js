import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { loadFeature, defineFeature } from 'jest-cucumber'
import App from '../App'

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature')

defineFeature(feature, (test) => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('When the user hasn’t specified a number, 32 events are shown by default', ({
    given,
    when,
    then,
  }) => {
    given(
      'the user has opened the app for the first time and chosen a city to find events',
      async () => {
        render(<App />);
        // wait for default load
        await waitFor(() => expect(screen.getAllByTestId('event').length).toBeGreaterThan(0));
      }
    );

    when('the list of events is displayed', () => {
      // already handled in given
    });

    then('a maximum of 32 events should be shown by default', async () => {
      const events = await screen.findAllByTestId('event');
      expect(events.length).toBeLessThanOrEqual(Number(32));
    });
  });

  test('The User can change the number of events displayed', ({
    given,
    when,
    then,
  }) => {
    let input;

    given('that the user is viewing the list of events', async () => {
      render(<App />);
      await waitFor(() => expect(screen.getAllByTestId('event').length).toBeGreaterThan(0));
      input = screen.getByTestId('number-input');
    });

    when('the user sets the number of events to display a chosen number', async () => {
      await user.clear(input);
      await user.type(input, '10');
    });

    then('only the chosen number of events should be shown in the list', async () => {
      const events = await screen.findAllByTestId('event');
      expect(events.length).toBeLessThanOrEqual(10);
    });
  });
});
