// dependencies
const path = require("path");

// View routing
module.exports = (application) => {
  // creating routes
  // A GET notes that returns the notes.html file.
  application.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // A GET routs that returns the index.html file.
  application.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
