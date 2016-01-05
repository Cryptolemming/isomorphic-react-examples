var express = require('express');
var router = express.Router();

/* concat all api arrays, sort by newest date, 
and filter for newest entries */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Index'});
});

module.exports = router;
