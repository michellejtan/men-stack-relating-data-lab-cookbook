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
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;