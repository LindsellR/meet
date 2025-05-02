# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Feature 2: Show/Hide Event Details
**User Story:** * As a user, I should be able to show or hide event details so that I can view more information about an event only when I need it.*
  **Scenario:** An event element is collapsed by default
    Given the user has opened the app and chosen a city to find events
    When the list of events is displayed
    Then each event element should be collapsed by default and the event details should	not be visible

  **Scenario:** The User can expand an event to see details
    Given that the user is viewing a list of collapsed events
    When the user clicks on the "Show Details" button of an event
    Then the details of that event should be displayed

  **Scenario:** The User can collapse an event to hide details
    Given the user has expanded an event to view its details
    When the user clicks on the "Hide Details" button of that event
    Then the details of that event should be hidden


## Feature 3: Specify Number of Events
**User Story:**  *As a user, I should be able to specify the number of events I want to see so that I can control how much information is displayed to me at once.*
  **Scenario:** When the user hasn’t specified a number, 32 events are shown by default
    Given the user has opened the app for the first time and chosen a city to find events
    When the list of events is displayed
    Then, 32 events should be shown by default

  **Scenario:** The User can change the number of events displayed
    Given that the user is viewing the list of events
    When the user sets the number of events to display a chosen number 
   Then, only the chosen number of events should be shown in the list


## Feature 4: Use the App When Offline
**User Story:** * As a user, I should be able to use the app even when I'm offline so that I can view previously loaded events without an internet connection.*
  **Scenario:** Show cached data when there’s no internet connection
    Given the user has previously opened the app with an internet connection
    And the event data has been cached
    When the user opens the app without an internet connection
    Then the cached event data should be displayed

  **Scenario:** Show error when user changes search settings (city, number of events)
    Given the user is offline
    When the user attempts to change the city or the number of events
    Then, an error message should be displayed indicating there is no internet connection

## Feature 5: Add an App Shortcut to the Home Screen
**User Story:** * As a user, I should be able to add a shortcut to the app on my home screen so that I can access it quickly like a native mobile app.*
  **Scenario:** User can install the Meet app as a shortcut on their device home screen
    Given that the user is using a compatible browser
    When the browser prompts the user to install the app, and the user accepts the prompt
    Then, the Meet app should be added to the device's home screen

## Feature 6: Display Charts Visualising Event Details
**User Story:**  *As a user, I should be able to view charts that visualise event data so that I can understand event trends and insights at a glance.*
  **Scenario:** Show a chart with the number of upcoming events in each city
    Given that the user is viewing the events dashboard
    When the event data is loaded
    Then, a chart should be displayed showing the number of upcoming events per city
