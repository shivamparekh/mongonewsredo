// packages

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');

var PORT = process.env.PORT || 3000;

// requiring our Note and Article models

var Comment = require("./models/comment.js");
var Articles = require("./models/article.js");

// this makes scraping possible

var request = require("request");
var cheerio = require("cheerio");

// set mongoose to leverage built in JavaScript ES6 Promises

mongoose.Promise = Promise;

// create app

var app = express();

// morgan

app.use(logger("dev"));

// body-parser

app.use(bodyParser.urlencoded({ extended: false }));

// use handlebars

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static directory

app.use(express.static("public"));

// database

mongoose.connect("mongodb://localhost/mongonews");

var db = mongoose.connection;

// log errors

db.on("error", function(error) {

	console.log(error);

});

// log success

db.once("open", function() {

	console.log("Connection successful");

});

// routes using 18.3 activities

app.get("/", function(req, res) {
  
  request("https://www.reddit.com/r/webdev/", function(error, response, html) {
    
    var $ = cheerio.load(html);
    
    $("p.title").each(function(i, element) {

      
      var result = {};

      
      result.title = $(this).children("a").text();

      result.link = $(this).children("a").attr("href");

    });

  });

  res.send("Scrape Complete");

  console.log(req)

});

app.get("/articles", function(req, res) {
  
  Article.find({}, function(error, doc) {
    
    if (error) {

      console.log(error);

    }
    
    else {

      res.json(doc);

    }

  });
});

// listener

app.listen(3000, function() {

  console.log("App running on port 3000!");

});