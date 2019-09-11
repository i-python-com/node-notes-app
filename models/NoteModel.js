const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema(
  {
    title: String,
    content: String
  },
  {
    timestamps: true
  }
)

module.exports = Note = mongoose.model('note', NoteSchema)
