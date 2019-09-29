const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// Set Handlebars.
const exphbs = require("express-handlebars");

// import hbs helpers 
const hbsHelpers = require("./helpers/hbsHelpers");

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: hbsHelpers
}));

app.set('view engine', 'handlebars');

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";

mongoose.connect(MONGODB_URI);

var routes = require('./routes/index');

// Import my test routes into the path '/test'
app.use('/', routes);

// initiliaize app
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});