var express = require('express'),
    router = express.Router();

var apiRoutes = require('./apiRoutes');
var htmlRoutes = require('./htmlRoutes');

// Import my automated routes into the path '/tests/automated'
// This works because we're already within the '/tests' route so we're simply appending more routes to the '/tests' endpoint
router.use(apiRoutes);
router.use(htmlRoutes);

module.exports = router;