import express from 'express';
import AllRouter from "./Routers/index.js";
import { config } from 'dotenv';
const app = express();
import connectDB from './database/db.js';
import cors from "cors";
import bodyParser from 'body-parser';

app.use(cors({
        origin: 'http://localhost:3000',
        options: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type"],
}));
app.use(bodyParser.json({
        extended: true,
        prameterLimit: 100,
        limit: "10mb",
}));

app.use("/api/v1/", AllRouter);

app.listen(3000, () => {
        console.log(`Listening to port 3000`);
});

config({
        path : './database/config.env',
})

connectDB();