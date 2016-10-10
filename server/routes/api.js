const router = require("express").Router();
var express = require('express');
const ctrlArt = require('../controllers/artController.js');

var ctrlAuth = require('../controllers/authenticationController.js');
var passportService = require('../services/passport');
var passport = require('../../node_modules/passport');

// middleware helper to process authentication requests thru passport
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

// Define routes for Facebook authentication
router.post('/login/facebook', passport.authenticate('facebook'));
router.post('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.post("/art", ctrlArt.insertArt);
router.post("/findArt", ctrlArt.findArt);
router.post("/comments", ctrlArt.insertComment);
router.post("/commentsGet", ctrlArt.getComments);
router.post("/signin", requireSignin, ctrlAuth.signin);
router.post("/signup", ctrlAuth.signup);

console.log("in dat router")
router.put("/art", ctrlArt.editArt)
router.put("/art/editLikes", ctrlArt.editLikes)




module.exports = router;