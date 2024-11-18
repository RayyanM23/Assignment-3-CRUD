var express = require('express');
var router = express.Router();

/* GET Splash page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Splash Page' });
});

module.exports = router;
