const express = require('express');
const Note = require('../models/note');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const notes = await Note.find({ user: req.session.userId });
    res.render('dashboard', { notes });
});

router.post('/add', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const { title, content } = req.body;
    const note = new Note({
        title,
        content,
        user: req.session.userId
    });
    await note.save();
    res.redirect('/notes');
});

module.exports = router;
