import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import morgan from "morgan";
// * Authentication and database connnection
import connectDb from "./db/connect.js";
// * Authentication and database connnection

// * Routers
import authRouter from "./routes/authRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
// * Routers

// * Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
// * Middleware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  // throw new Error("error");
  res.send(`welcome to ${port}`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hotel", hotelRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
