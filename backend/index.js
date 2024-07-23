import cors from "cors";
import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURI } from "./config.js";
import bookRoute from "./routes/bookRoute.js";

const app = express();

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

//connecting with the database
mongoose
    .connect(mongoDBURI)
    .then(() => {
        console.log("Connected with mongodb");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
