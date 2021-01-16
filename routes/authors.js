const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors Route
router.get('/', (req, res) => {
    res.render('authors/index');
})

// New author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})

// Create author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
    // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author',
    //         })
    //     } else {
    //         res.redirect(`authors`);
    //     }
    // })
})

module.exports = router;