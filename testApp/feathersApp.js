const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const memory = require("feathers-memory");

// Create an Express compatible Feathers application instance.
const app = express(feathers());
// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable REST services
app.configure(socketio());

// Configure channels
app.on("connection", connection => {
  // On a new real-time connection, add it to the
  // anonymous channel
  app.channel("anonymous").join(connection);
});
app.publish((data, context) => {
  return app.channel("anonymous");
});

// Create an in-memory Feathers service with a default page size of 2 items
// and a maximum size of 4
app.use(
  "/test",
  memory({
    paginate: {
      default: 3,
      max: 10
    }
  })
);
// Set up default error handler
app.use(express.errorHandler());

// Start the server.
const port = 3030;

app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});

module.exports = app;
