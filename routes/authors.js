const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions["name"] = new RegExp(req.query.name, 'i');
       // searchOptions.name = req.query.name;
    }
    try {
        const authors = await Author.find(searchOptions);
        // ex: Author.find({'name': 'gau'})
        res.render('authors/index', { 
            authors: authors,
            search: req.query.name,
        });
    } catch {
        res.redirect('/');
    }
    
})

// New author Route
router.get('/new',  (req, res) => {
    
    res.render('authors/new', { author: new Author() });
})

// Create author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.authorName
    })
    try {
        const newAuthor = await author.save();
        console.log('save new author')
        res.redirect('authors');
    } catch {
        
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
        console.log(err)
    }
    // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author',
    //         })
    //         console.log(err)
    //     } else {
    //         res.redirect(`authors`);
    //     }
    // })
})

module.exports = router;