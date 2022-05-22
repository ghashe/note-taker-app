// Express.js is required and hence this requires Express.js
const express = require("express");

// initializing the express application

// Assigning express() to the application variable so that we can later chain on methods to the Express.js server
const application = express();
const PORT = process.env.PORT || 3010;

// Take incoming string or array of data and parse it
application.use(express.urlencoded({ extended: true }));
// Take incoming JSON data and parse it
application.use(express.json());
application.use(express.static(__dirname));

// this requires routes file
require("./routes/apiRoutes")(application);
require("./routes/htmlRoutes")(application);

//chaining the listen () method onto the server
application.listen(PORT, () => {
  console.log("API server now listening on PORT: " + PORT + "!");
});
