# meet
an app to find local events to meet up at
Serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. <br>
The application uses the Google Calendar API to fetch upcoming event

<h1> Features </h1>

<li> Filter events by city.
<li>Show/hide event details.
<li>Specify number of events.
<li>Use the app when offline.
<li>Add an app shortcut to the home screen.
<li>View a chart showing the number of upcoming events by city.

<h2>Install Dependencies</h2>
npm install

<h2>Run</h2>
npm run start

<h1> Deploy </h1>
npm run deploy


<h1> Demo </h1>
The APP is live at https://calamity-chain.github.io/meet/

->Version: 1.0.0 <br>
->License: MIT <br>
->Author: Calamity Chain <br>



<h2>MEET User Stories</h2>

USER STORY FEATURE 1 As a user I should be able to filter events by city So that I can see what is happening where I am located

FEATURE 1: FILTER EVENTS BY CITY Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities. Scenario 2: User should see a list of suggestions when they search for a city. Scenario 3: User can select a city from the suggested list.

SCENARIO 1: When user hasn’t searched for a city, show upcoming events from all cities. Given user hasn’t searched for any city When the user opens the app Then the user should see a list of all upcoming events

SCENARIO 2: User should see a list of suggestions when they search for a city. Given the main page is open When user starts typing in the city textbox Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: User can select a city from the suggested list. Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing When the user selects a city (e.g., “Berlin, Germany”) from the list Then their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

USER STORY FEATURE 2 As a user I should be able to show and hide an events details So that I can see what is exactly happening for each event

FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS Scenario 1: An event element is collapsed by default Scenario 2: User can expand an event to see its details Scenario 3: User can collapse an event to hide its details

SCENARIO 1: An event element is collapsed by default Given list event element has been loaded And app loaded When the user hasn’t clicked details button yet
Then the event element is collapsed by default

SCENARIO 2: User can expand an event to see its details Given app is loaded And list of events has been loaded When the user clicks on details button Then the element should open to show details

SCENARIO 3: User can collapse an event to hide its details Given app is loaded And event element is expanded When the user clicks on hide details button Then element should collapse, hiding details

USER STORY FEATURE 3 As a user I should be able to specify the number of events I want shown So that I can see the events in an organized way without overwhelming me

FEATURE 3: SPECIFY NUMBERS OF EVENTS Scenario 1: When user hasn’t specified a number, 32 is the default number Scenario 2: User can change the numbers of events they want to see

SCENARIO 1: When user hasn’t specified a number, 32 is the default number Given user hasn’t specified a number When app is loaded Then the user should see 32 events shown by default

SCENARIO 2: User can change the numbers of events they want to see Given user hasn’t specified a number When the user can change number of events Then the user should see event element with given number of events user choose

USER STORY FEATURE 4 As a user I should be able to use the app when offline So that I can see the events I wanted to attend even with no internet

FEATURE 4: USE APP WHEN OFFLINE Scenario 1: Show cached data when there’s no internet connection Scenario 2: Show error when user changes the settings (city, time range)

SCENARIO 1: Show cached data when there’s no internet connection Given user has no internet connection When the user uses app Then the user should see cached data for their chosen city and time range

SCENARIO 2: Show error when user changes the settings (city, time range)
Given user has no internet connection When the user uses app Then the user should see error when attempting to make changes to city or time as their is no internet connected to make these changes

USER STORY FEATURE 5 As a user I should be able to see a chart with event data So that I can see the all events happening in the city at one time

FEATURE 5: DATA VISUALIZATION Scenario 1: Show a chart with the number of upcoming events in each city

SCENARIO 1: Show a chart with the number of upcoming events in each city
Given user has inputed their city When the user clicks on chart Then the user should see a chart displaying the number of events in that city and be able to click on other cities to see their charts as well
