const express = require('express');
const Book = require('../models/book.model.js');
const router = express.Router();
const bookController = require('../controllers/book.controller.js');

router.get('/', bookController.getAllBooks)
router.get('/recent', bookController.getRecentBooks)
router.get('/:id', bookController.getBookById)
router.post('/', bookController.addBook)
router.put('/:id', bookController.updateBookbyID)
router.delete('/:id', bookController.deleteBookById)

module.exports = router;