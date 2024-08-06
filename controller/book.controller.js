import Book from "../model/book.model.js";
import JWT from "jsonwebtoken"
import User from "../model/user.model.js";
export const getBook = async(req, res) => {
    try {
        const fullname=req.fullname;
        const book = await Book.find();
        res.status(200).json({
            book,
            fullname
        });
    } catch (error) {
        console.log("Error in book controller ", error);
        res.status(500).json(error);
    }
};