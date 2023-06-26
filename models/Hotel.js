import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 50,
    },
    description: {
      type: String,
      // required: [true, "Please provide company name"],
      // maxlength: 200,
    },
    type: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 50,
    },
    location: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 50,
    },
    address: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 150,
    },
    rating: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 5,
    },
    offer: {
      type: String,
      // required: [true, "Please provide company name"],
      maxlength: 2,
    },
    image: {
      type: String,
      // required: [true, "Please provide company name"],
      // maxlength: 5,
    },
    foods: {
      type: Array,
      // required: [true, "Please provide company name"],
      // maxlength: 5,
    },
    foodImage: {
      type: Array,
      // required: [true, "Please provide company name"],
      // maxlength: 5,
    },
    cost: {
      type: Array,
      // required: [true, "Please provide company name"],
      // maxlength: 5,
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   // required: [true, 'Please provide user'],
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);
