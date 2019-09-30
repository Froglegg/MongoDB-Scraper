var express = require('express'),
    router = express.Router();

var mongoose = require("mongoose");
var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

router
    .get('/api/scrape', function(_req, res) {
        axios.get("http://www.echojs.com/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("article h2").each(function(i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .children("a")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function(dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });

            // Send a message to the client
            res.redirect("/articles");
        });
    });

// for viewing articles json 
router.get("/api/articles", function(req, res) {
    db.Article.find().then((articles) => {
        res.json(articles);
    });
});


// NOTES 

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/api/articles/:id", function(req, res) {

    db.Article.findById(req.params.id).populate('note').exec((err, result) => {
        if (err) return handleError(err);
        console.log(result);
        res.json(result);
    });
});

// Route for saving/updating an Article's associated Note
router.post("/api/articles/:id", function(req, res) {

    db.Note.create(req.body).then((dbNoteResource) => {
            // you could also just use findByIdAndUpdate(req.params.id) instead of findOneAndUpdate(req.params.id)
            db.Article.findOneAndUpdate({ "_id": req.params.id }, { note: dbNoteResource._id }).then((dbArticleUpdated) => {
                console.log(dbArticleUpdated);
                res.json(dbArticleUpdated);
            })
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Saved status
router.post("/api/articles/save/:id", function(req, res) {
    console.log(req.body);
    // you could also just use findByIdAndUpdate(req.params.id) instead of findOneAndUpdate(req.params.id)
    db.Article.findOneAndUpdate({ "_id": req.params.id }, { saved: req.body }).then((dbArticleSaved) => {
            console.log(dbArticleSaved);
            res.json(dbArticleSaved);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;