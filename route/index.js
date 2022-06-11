/*
File: Index.js
Name: Ruchi Patel
StudentId: 301234579
Date: June 3, 2022
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', home);

function home(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'Express',
      userName: 'Ruchi'
    }
  );
}

/* GET About page. */
router.get('/AboutMe', function(req, res, next) {
  res.render('AboutMe', { title: 'About'});
});

/* GET Project page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});

/* GET Service page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services'});
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact'});
});


module.exports = router;
