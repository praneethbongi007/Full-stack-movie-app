import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // cors = (cross origin resource sharing), it allows to share resources across origins using express middleware.
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // in other words it allows to share data from local network to server.

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDb`);
    server.listen(port, () => {
      console.log(`Listening at port http://localhost/${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1); //exit at a status code of 1 which is a "uncaught fatel error message"
    // default exit status is zero.
  });
