import cors from "cors";
import dotenv from "dotenv";
import express, { response } from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

//middleware for parsing req body
app.use(express.json());

//middleware for handling cores policy
app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:8000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

//root
app.get("/", (req, res) => {
    return res.status(200).send(`Hello my second request`);
});

//middleware for handling routes with prefix "books"
app.use("/books", bookRoute);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected with mongodb");
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
