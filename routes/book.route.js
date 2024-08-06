import express from "express";
import { getBook } from "../controller/book.controller.js";
import { Auth } from "../middleware/Auth.js";
import { getFreeBook } from "../controller/book.js";

const router = express.Router();

router.get("/",Auth, getBook);
router.get("/free",getFreeBook)

export default router;