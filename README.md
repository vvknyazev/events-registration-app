# Events Registration App

A full-stack application that allows users to browse, register, and track participants for events. The app supports event creation, registration management, and data visualization for event participation.

## Features

### Base Level
- **Events Board Page:** Users can observe a paginated list of available events, pre-populated either manually or via a seed script. Each event consists of:
  - Title
  - Description
  - Event date
  - Organizer

- **Event Registration Page:** Users can register for an event by filling out a form with the following fields:
  - Full name
  - Email
  - Date of birth
  - "Where did you hear about this event?"

  After submission, the response is stored in the database.

- **Event Participants Page:** Displays a list of registered participants, accessible by clicking the “View” button on an event.

### Middle Level
- Everything from the base level, plus:
  - **Sorting:** Sort events on the events board page by title, event date, or organizer.
  - **Form Validation:** Event registration form includes validation for all fields.
  - **DatePicker:** A date picker is added to the date of birth input field.
  - **Search Participants:** Search for participants by full name or email on the event participants page.

### Advanced Level
- Everything from the middle level, plus:
  - **Infinite Scroll Pagination:** Automatically loads more events as the user scrolls down the events board page.
  - **Registrations Chart:** Displays a line/bar chart showing the number of registrations per day for each event on the event participants page.

**Note:** The last feature was not implemented:  
- **Separate Script:** Implement a script that runs at defined intervals to fetch events from a third-party API and store them in the database.

## Installation

### Prerequisites
- Node.js
- MongoDB
- React
- Express

### Backend
1. Clone the repository.
2. Navigate to the `server` folder.
3. Create a `.env` file and add the following:
   ```bash
   DB_URL=your_mongodb_connection_string
4. Install dependencies:
  ```bash
  npm install
```
5. Start the server:
```bash
npm start
```
## Frontend
1. Navigate to the `client` folder.
2. Create a `.env` file and add:
   ```bash
   REACT_APP_API_URL=your_server_api

4. Install dependencies:
  ```bash
  npm install
```
5. Start the client:
```bash
npm start
```
### Routes

- `POST /register`: Register a user for an event.
- `GET /events`: Fetch all available events.
- `GET /:id`: Fetch details of a specific event by its ID.
- `GET /:id/registrations`: Fetch registered participants for a specific event.
- `GET /events/:eventId/registrations-per-day`: Get the number of registrations per day for a specific event.

