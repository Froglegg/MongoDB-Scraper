var express = require('express'),
    router = express.Router();

router
// Add a binding to handle '/test'
    .get('/', function(req, res) {
    res.render("index", {
        styles: ["normalize.css", "nav.css", "styles.css"],
        headScripts: ["nav.js"],
        bodyScripts: [],
        title: "About | Hayes Crowley"
    });
});

module.exports = router;