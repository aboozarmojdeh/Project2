// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

// Routes
// =============================================================
var express = require('express');
var router = express.Router();

// Import the model to use its database functions.
var lost = require('../models/lost.js');
var found = require('../models/found.js');
var user = require('../models/user.js');


// lost route loads lost.html

//Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
  res.render('home');
});

router.get('/index', function (req, res) {
  res.render('home');
});

router.get('/found', function (req, res) {
  res.render('found')
});

router.get('/lost', function (req, res) {
  res.render('lost')
});

router.get('/browse-items', function (req, res) {
  res.render('browse')
});

router.get('/SignIn', function (req, res) {
  res.render('SignIn')
});

router.get('/SignUp', function (req, res) {
  res.render('SignUp')
});

router.get("*", function (req, res) {
  res.render('page-404')
});

module.exports = router;