const express = require('express')
const router = express.Router()

const notes = require('../controllers/notesController')

// Create a new Note
router.post('/', notes.create)

// Retrieve all Notes
router.get('/', notes.findAll)

// Retrieve a single Note with noteId
router.get('/:noteId', notes.findOne)

// Update a Note with noteId,  router.patch()
router.put('/:noteId', notes.update)

// Delete a Note with noteId
router.delete('/:noteId', notes.delete)

module.exports = router
