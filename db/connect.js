import mongoose from "mongoose";

const connectDb = (url) => {
  console.log("Connected to admin database");
  return mongoose.connect(url);
};

export default connectDb;
