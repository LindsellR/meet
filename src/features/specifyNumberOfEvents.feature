Feature: Specify Number of Events

Scenario: When the user hasn’t specified a number, 32 events are shown by default  
    Given the user has opened the app for the first time and chosen a city to find events  
    When the list of events is displayed  
    Then a maximum of 32 events should be shown by default

Scenario: The User can change the number of events displayed  
    Given that the user is viewing the list of events  
    When the user sets the number of events to display a chosen number  
    Then only the chosen number of events should be shown in the list