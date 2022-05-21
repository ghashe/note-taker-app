const { application } = require("express");
const fs = require("fs");
const path = require("path");

module.exports = (application) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    // creating a route that the front-end can request data from
    application.get("/api/notes", function (request, response) {
      response.json(notes);
    });
  });
};
