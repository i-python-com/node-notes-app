const Note = require('../models/NoteModel')

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      msg: 'Note content can not be empty'
    })
  }

  // Create new note
  const note = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content
  })

  // Save note in the database
  note
    .save()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        msg: err.message || 'Somme error occurred while creating the note'
      })
    )
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => res.send(notes))
    .catch(err =>
      res.status(500).send({
        msg: err.message || 'Some error occured while retrieving all notes'
      })
    )
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          msg: `Note not found with id ${req.params.noteId}`
        })
      }

      res.send(note)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          msg: `Note not found with id ${req.params.noteId}`
        })
      }

      return res.status(500).send({
        msg: `Error retrieving note with id ${req.params.noteId}`
      })
    })
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      msg: `Note content can not be empty`
    })
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || 'Untitled Note',
      content: req.body.content
    },
    { new: true }
  ) // The {new: true} option used to return the modified document instead of the original
    .then(note => {
      if (!note) {
        return res.status(404).send({
          msg: `Note not found with id ${req.params.noteId}`
        })
      }

      res.send(note)
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ msg: `Note not found with id ${req.params.noteId}` })
      }

      return res.status(500).send({
        msg: `Error updating note with id ${req.params.noteId}`
      })
    })
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          msg: `Note not found with id ${req.params.noteId}`
        })
      }

      res.send({ msg: 'Note delete successfully!' })
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ msg: `Note not found with id ${req.params.noteId}` })
      }

      return res.status(500).send({
        msg: `Could not delete note with id ${req.params.noteId}`
      })
    })
}
