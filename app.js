"use strict";

// external dependencies
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
// const session = require("express-session");
const path = require("path");
const Logger = require("./services/LoggerService")("Server");

/* db */
const mongoose = require('mongoose');
console.log('process.env.MONGODB_URI is:', process.env.MONGODB_URI);

// Routes
const SRIDRoute = require("./routes/SRIDRoute.js");

new SRIDRoute(app);

const url =
  process.env.MONGODB_URI ||
  'mongodb+srv://sridTeam:dbUserPassword@plastics-srb5j.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.resolve(__dirname + '/views/public')));

// app.use(express.static(path.join(__dirname, '/views/public')));

// have the user score ready
var currentScore = 1997;
io.on('connection', (socket) => {

  if (currentScore < 2000) {
    socket.emit("displayBadge", "gold");
  } else {
    socket.emit("displayBadge", "platinum");
  }

  socket.emit("currentScore", currentScore);

  socket.on("updateScore", (increment) => {
    currentScore += increment;
    socket.emit("currentScore", currentScore);
    if (currentScore < 2000) {
      socket.emit("displayBadge", "gold");
    } else {
      socket.emit("displayBadge", "platinum");
    }
  });
});


//////////////// Starting server ////////////////
if (!isNaN(parseInt(process.argv[2]))) {
  const port = process.env.PORT || parseInt(process.argv[2]);
  server.listen(port, () => {
    Logger.log("running on http://localhost:" + port)
    Logger.log("__dirname: " + __dirname)
  })
}

module.exports = app;