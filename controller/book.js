import Book from "../model/book.model.js";

export const getFreeBook = async(req, res) => {
    try {
        const book = await Book.find();
        const data = book.filter((data) => data.price === 0);
        // console.log(book)
        res.status(200).json(data);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};