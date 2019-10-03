var express = require("express"),
  router = express.Router();

var db = require("../models");

router.get("/", function(_req, res) {
  res.render("index", {
    styles: ["normalize.css", "nav.css", "styles.css"],
    headScripts: ["jquery.min.js"],
    bodyScripts: ["nav.js"],
    title: "About | Mongo Scraper"
  });
});

// for viewing articles json
router.get("/articles", function(req, res) {
  db.Article.find()
    .populate("note")
    .then(articles => {
      res.render("scrapedArticles", {
        styles: ["normalize.css", "nav.css", "styles.css"],
        headScripts: ["jquery.min.js"],
        bodyScripts: ["app.js", "nav.js"],
        title: "Results | Mongo Scraper",
        articles: articles
      });
    });
});

router.get("/savedArticles", function(req, res) {
  db.Article.find({ saved: true })
    .populate("note")
    .then(articles => {
      res.render("savedArticles", {
        styles: ["normalize.css", "nav.css", "styles.css"],
        headScripts: ["jquery.min.js"],
        bodyScripts: ["app.js", "nav.js"],
        title: "Saved Articles | Mongo Scraper",
        articles: articles
      });
    });
});

module.exports = router;
