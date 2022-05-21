// Express.js is required and hence this requires Express.js
const express = require("express");

// initializing the express application

// Assigning express() to the application variable so that we can later chain on methods to the Express.js server
const application = express();
const PORT = process.env.PORT || 3010;

// this requires routes file
require("./routes/routes")(application);

//chaining the listen () method onto the server
application.listen(PORT, function () {
  console.log(`API server now listening on PORT: ` + PORT + `!`);
});
