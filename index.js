import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import bookRoute from "./routes/book.route.js"
import userRoute from "./routes/user.route.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
    origin: 'https://book-store-client-pink.vercel.app/', // Allow this origin
    credentials: true, // Allow credentials
  };
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});