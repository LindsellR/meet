Feature: Show or hide event details

Scenario: An event element is collapsed by default  
    Given the user has opened the app and chosen a city to find events  
    When the list of events is displayed  
    Then each event element should be collapsed by default and the event details should not be visible

Scenario: The User can expand an event to see details  
    Given that the user is viewing a list of collapsed events  
    When the user clicks on the "Show Details" button of an event  
    Then the details of that event should be displayed

Scenario: The User can collapse an event to hide details  
    Given the user has expanded an event to view its details  
    When the user clicks on the "Hide Details" button of that event  
    Then the details of that event should be hidden and the event should display it's collapsed default state.