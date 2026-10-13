const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a book title"],
    trim: true
  },
  author: {
    type: String,
    required: [true, "Please provide a book author"],
    trim: true
  },
  genre: {
    type: String,
    enumerated: ["Fiction", "Science", "History", "Technology", "Other"],
    default: "Other"
  },
  published: {
    type: Number,
    min: [1000, 'Published year cannot be lower than 1000']
  },
  shelfLocation: {
    type: String
  },
  totalCopies: {
    type: Number,
    min: [1, "Total copies must be at least 1"],
    required: [true, "Please provide the total number of copies"]
  },
  availableCopies: {
    type: Number,
    min: [0, "Available copies cannot be negative"],
    default: 1
  },
  isAvailable: {
    type: Boolean,
    default: true   
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

bookSchema.index(
  { title: 1, author: 1 },
  { unique: true }
);

module.exports = mongoose.model('Book', bookSchema);