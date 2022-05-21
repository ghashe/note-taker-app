const { application } = require("express");
const fs = require("fs");
const path = require("path");

module.exports = (application) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;

    // =============== Routes for APIs ===============

    // Defining the notes variable
    var notes = JSON.parse(data);

    // creating a route that the front-end can request data from
    application.get("/api/notes", function (request, response) {
      response.json(notes);
    });

    // Making a POST route that the front-end uses to insert data into the database
    application.post("/api/notes", function (request, response) {
      // Upon receiving a new note, it is added to db.json, and returns that note
      let newNote = request.body;
      notes.push(newNote);
      createAndDeleteNote();
      response.json(request.body);
    });

    // creating a GET route that the front-end can retrieves a note with specific id
    application.get("/api/notes/:id", function (request, response) {
      // display json for the notes array indices of the provided id
      response.json(notes[request.params.id]);
    });

    // creating a delete route that the front-end uses to delete data from the database
    application.delete("/api/notes/:id", function (request, response) {
      notes.splice(request.params.id, 1);
      createAndDeleteNote();
      console.log("Note with id: " + request.params.id + " has been deleted!");
    });

    // Adds or removes notes to the json file
    function createAndDeleteNote() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
