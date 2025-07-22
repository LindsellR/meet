# The Meet App - Built with React + Vite

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [TDD/BDD Process](#tddbdd)
- [Key Features](#key-features)
- [Installation](#installation)
- [Running the App Locally](#running-the-app-locally)
- [Running Tests](#running-tests)


## Project Overview
A serverless progressive web application (PWA) built using a test driven development (TDD) approach and utilising a Google Calendars API to fetch events. The app uses OAuth2 authentication and AWS serverless functions for the authorisation server.

## Technologies Used
- **React**
- **Google Calendar API**
- **AWS Lambda**
- **OAuth2 Authentication**
- **Jest-Cucumber**
- **Rechart Charting Library**

## TDD/BDD
This app was built using a Test-Driven Development (TDD) and Behavior-Driven Development (BDD) approach, resulting in more efficient and higher-quality code. By writing code to meet specific requirements from the start, this methodology ensures better alignment with user needs and app functionality.
Unit and integration tests were used to identify and resolve bugs early, focusing on individual units and their interactions. BDD and end-to-end testing allowed user-facing issues to be detected and addressed throughout development.
The process included:
- **Creating user stories based on user requirements and app functionality.**
- **Translating user stories into multiple test scenarios using Jest-Cucumber.**
- **Writing unit tests for each function.**
- **Implementing and testing integration use cases.**
- **Writing acceptance tests for non-developers and conducting automated end-to-end tests.**
- **Implementing Progressive Web App (PWA) features to support offline use.**
- **Visualizing event data using the Recharts charting library**


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Key Features
- **Filter Events by City.**
- **Show/Hide Event Details.**
- **Specify Number of Events.**
- **Use the App When Oﬄine.**
- **Add an App Shortcut to the Home Screen.**
- **Display Charts Visualizing Event Details.**

## Feature 1: Filter Events by City

**User Story** As a user, I should be able to filter events by city
So that I can see a list of events taking place in that city.

**Scenario:** When user hasn’t searched for a city, show upcoming events from all cities.  
 - **Given** ser hasn’t searched for any city;  
 - **When** the user opens the app;  
 - **Then** the user should see a list of all upcoming events

**Scenario:** User should see a list of suggestions when they search for a city.  
 - **Given** the main page is open;  
 - **When** When user starts typing in the city textbox;  
 - **Then** the user should receive a list of cities (suggestions) that match what they’ve typed.

**Scenario:** User can select a city from the suggested list.  
 - **Given** user was typing “Berlin” in the city textbox  
 - **And** the list of suggested cities is showing;  
 - **When** the user selects a city (e.g., “Berlin, Germany”) from the list;  
 - **Then** their city should be changed to that city (i.e., “Berlin, Germany”)  
 - **And** the user should receive a list of upcoming events in that city.

## Feature 2: Show/Hide Event Details

**User Story:** As a user, I should be able to show or hide event details so that I can view more information about an event only when I need it.\*

**Scenario:** An event element is collapsed by default  
 - **Given** the user has opened the app and chosen a city to find events  
 - **When** the list of events is displayed  
 - **Then** each event element should be collapsed by default and the event details should not be visible

**Scenario:** The User can expand an event to see details  
 - **Given** that the user is viewing a list of collapsed events  
 - **When** the user clicks on the "Show Details" button of an event  
 - **Then** the details of that event should be displayed

**Scenario:** The User can collapse an event to hide details  
 - **Given** the user has expanded an event to view its details  
 - **When** the user clicks on the "Hide Details" button of that event  
 - **Then** the details of that event should be hidden and the event should display it's collapsed default state.

## Feature 3: Specify Number of Events

**User Story:** _As a user, I should be able to specify the number of events I want to see so that I can control how much information is displayed to me at once._

**Scenario:** When the user hasn’t specified a number, 32 events are shown by default  
 - **Given** the user has opened the app for the first time and chosen a city to find events  
 - **When** the list of events is displayed  
 - **Then** a maximum of 32 events should be shown by default

**Scenario:** The User can change the number of events displayed  
 - **Given** that the user is viewing the list of events  
 - **When** the user sets the number of events to display a chosen number  
 - **Then** only the chosen number of events should be shown in the list

## Feature 4: Use the App When Offline

**User Story:** _As a user, I should be able to use the app even when I'm offline so that I can view previously loaded events without an internet connection._

**Scenario:** Show cached data when there’s no internet connection  
 - **Given** the user has previously opened the app with an internet connection
and the event data has been cached  
 - **When** the user opens the app without an internet connection  
 - **Then** the cached event data should still be displayed

**Scenario:** Show error when user changes search settings (city, number of events)  
 - **Given** the user is offline  
 - **When** the user attempts to change the city or the number of events  
 - **Then** an error message should be displayed indicating there is no internet connection

## Feature 5: Add an App Shortcut to the Home Screen

**User Story:** _As a user, I should be able to add a shortcut to the app on my home screen so that I can access it quickly like a native mobile app._

**Scenario:** User can install the Meet app as a shortcut on their device home screen  
 -**Given** that the user is using a compatible browser  
 -**When** the browser prompts the user to install the app, and the user accepts the prompt  
 -**Then** the Meet app should be added to the device's home screen

## Feature 6: Display Charts Visualising Event Details

**User Story:** _As a user, I should be able to view charts that visualise event data so that I can understand event trends and insights at a glance._

**Scenario:** Show a chart with the number of upcoming events in each city  
 - **Given** that the user is viewing the events dashboard  
 - **When** the event data is loaded  
 - **Then** a chart should be displayed showing the number of upcoming events per city

## Architectural Diagram

[React Component Diagram.pdf](https://github.com/user-attachments/files/20179431/React.Component.Diagram.pdf)

## Installation

To install and run the app locally:

```bash
git clone https://github.com/LindsellR/meet.git
cd meet
npm install
```

## Running the App Locally

Start the development server:  
npm run dev

## Running Tests

To run unit, integration, and end-to-end tests:  
npm test. 
  
Or specifically:  
npm run test:unit. 
npm run test:e2e. 
  
Note: The app uses Jest and Jest-Cucumber for tests.