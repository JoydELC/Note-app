 # Notes App

This is a small note-taking application where users can create, archive/activate, delete, and edit notes.

## Technologies Used

- **Backend**: The backend of this application is built using FastAPI, a web framework for building APIs with Python. It follows a layered architecture pattern with controllers, DAOs (Data Access Objects), services, and models.

- **Database**: PostgreSQL 16 is used as the database management system to store and manage the notes data.

- **Frontend**: The frontend of this application is developed using React, a popular JavaScript library for building user interfaces. Data is consumed from the backend using Axios, a promise-based HTTP client for the browser and Node.js.

## Backend API Routes

### Creating a Note

To create a new note, send a POST request to the `api/notes/` endpoint with the note data in the request body.

### Getting Active Notes
To retrieve all active notes, send a GET request to the `api/notes/active` endpoint.

### Getting Archived Notes
To retrieve all archived notes, send a GET request to the /notes/archived/ endpoint.

### Deleting a Note
To delete a note, send a DELETE request to the `api/notes/{note_id}` endpoint with the ID of the note to delete.

### Toggling Archive Status of a Note
To toggle the archive status of a note, send a PUT request to the `api/notes/{note_id}/archive_toggle` endpoint with the ID of the note to toggle.

### Updating a Note
To update a note, send a PUT request to the `api/notes/{note_id}` endpoint with the ID of the note to update and the updated note data in the request body.
