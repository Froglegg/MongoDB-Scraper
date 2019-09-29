var express = require('express'),
    router = express.Router();

router
// Add a binding for '/tests/automated/'
    .get('/api', function(req, res) {
    res.render("index", {
        styles: ["normalize.css", "nav.css", "styles.css"],
        headScripts: ["nav.js"],
        bodyScripts: [],
        title: "API | Hayes Crowley"
    });
});

module.exports = router;