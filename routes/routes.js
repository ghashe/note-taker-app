const fs = require("fs");
const path = require("path");

module.exports = (application) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    // =============== Routes for APIs ===============

    // Defining the notes variable
    var notes = JSON.parse(data);

    // creating a route that the front-end can request data from
    application.get("/api/notes", function (request, response) {
      // The following script reads the db.json file and returns all saved notes as JSON data.
      response.json(notes);
    });

    // Making a POST route that the front-end uses to insert data into the database
    application.post("/api/notes", function (request, response) {
      // Upon receiving a new note, it is added to db.json, and returns that note
      let newNote = request.body;
      notes.push(newNote);
      createAndDeleteNote();
      response.json(newNote);
      return console.log("The new added note: " + newNote.title);
    });

    // creating a GET route that the front-end can retrieves a note with specific id
    application.get("/api/notes/:id", function (request, response) {
      // This method returns a json file containing the notes array indexes for the given id
      response.json(notes[request.params.id]);
    });

    // creating a delete route that the front-end uses to delete data from the database
    application.delete("/api/notes/:id", function (request, response) {
      notes.splice(request.params.id, 1);
      createAndDeleteNote();
      response.json(true);
      console.log("The requested note has been successfully deleted!");
    });

    // =============== Routes for views ===============

    // This function is used to display notes.html file if notes route has been accessed.
    application.get("/notes", function (request, response) {
      response.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // This function is used to display index.html if all other routes have been accessed
    application.get("/", function (request, response) {
      response.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // =============== Routes for update note ===============

    // Adds or removes notes to the json file
    function createAndDeleteNote() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
