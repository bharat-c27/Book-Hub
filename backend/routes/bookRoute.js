import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

app.options('*', cors()); 

//get a single book
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//get all the books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(201).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//create a new book
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//update a book
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//delete a book
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
