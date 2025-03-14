const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/foods
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
         // Assign pantry items to res.locals
         res.locals.pantry = currentUser.pantry;
        // pantry items are now available in the view
         res.render('foods/index.ejs');
        // res.render('foods/index.ejs', {
        //     pantry: currentUser.pantry,
        // });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/foods/new
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

//POST /users/:userID/foods
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      // Push req.body (the new form data object) to the
      // applications array of the current user
      currentUser.pantry.push(req.body);
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the food index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
});

module.exports = router;