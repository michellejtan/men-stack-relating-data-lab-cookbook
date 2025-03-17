const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', {
            allUsers
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Get /users/:userId/community/:userId
router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('users/show.ejs', {
            currentUser
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;