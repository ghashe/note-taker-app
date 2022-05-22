// dependencies
const path = require("path");
const fs = require("fs");

// npm package allowing the creation of unique identifiers
var uniqid = require("uniqid");

// api routing
module.exports = (application) => {
  // creating a route that the front-end can request data from
  application.get("/api/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "../db/db.json"));
  });

  // Making a POST route that the front-end uses to insert data into the database
  application.post("/api/notes", (request, response) => {
    let newNote = fs.readFileSync("db/db.json");
    newNote = JSON.parse(newNote);
    response.json(newNote);

    // The script creates the body of the note
    let noteCreated = {
      title: request.body.title,
      text: request.body.text,
      // Creating unique identifiers for each note
      id: uniqid(),
    };
    // Upon receiving a new note, it is added to db.json, and returns that note
    newNote.push(noteCreated);
    fs.writeFileSync("db/db.json", JSON.stringify(newNote));
    response.json(newNote);
  });

  // creating a delete route that the front-end uses to delete data from the database
  application.delete("/api/notes/:id", (request, response) => {
    //  This variable is used to read notes from db.json.
    let database = JSON.parse(fs.readFileSync("db/db.json"));
    // Erasing notes with ids
    let noteToBeDeleted = database.filter(
      (item) => item.id !== request.params.id
    );
    //   Update db.json with note
    fs.writeFileSync("db/db.json", JSON.stringify(noteToBeDeleted));
    response.json(noteToBeDeleted);
  });
};
