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
        res.redirect(`authors/${author.id}`);
    } catch {
        
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
        console.log(err)
    }
})
 
router.get('/:authorId', (req, res) => {
    res.send('Show Author '+ req.params.authorId);
})

router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.render('authors/edit', {author: author})
    } catch {
        res.redirect('/authors')
    }
})

router.put('/:id', async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        author.name = req.body.authorName;
        await author.save();
        res.redirect(`/authors/${author.id}`);
    } catch {
        if (author == null) {
            res.redirect('/');
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: "Error updating Author"
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let author;
    try {
        author = await Author.findById(req.params.id);
        await author.remove();
        res.redirect('/authors');
    } catch {
        if (author == null) {
            res.redirect('/');
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})

module.exports = router;