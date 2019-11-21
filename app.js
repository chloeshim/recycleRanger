"use strict";

// external dependencies
const express = require("express");
const app = express();
const server = require("http").createServer(app);
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
  'mongodb+srv://fse:iILVqSdgAMPA2UV6@cluster0-jsqk4.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname + '/views/public')));

// app.use(express.static(path.join(__dirname, '/views/public')));


//////////////// Starting server ////////////////
if (!isNaN(parseInt(process.argv[2]))) {
    const port = process.env.PORT || parseInt(process.argv[2]);
    server.listen(port, () => {
      Logger.log("running on http://localhost:" + port)
      Logger.log("__dirname: " + __dirname)
    })
  }

module.exports = app;