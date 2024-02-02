import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import AuthRouter from './routers/auth/router';

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

const port = 8000;

const mongoURI = "mongodb://localhost:27017/apis";

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use('/auth', AuthRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
