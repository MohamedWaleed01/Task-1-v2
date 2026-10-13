const Book = require('../models/book.model.js');

const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).json(book);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate book' });
        }
        return res.status(500).json({ message: error.message });
    }
};
 
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getBookById = async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateBookbyID = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteBookById = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
       return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getRecentBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookbyID,
    deleteBookById,
    getRecentBooks
}