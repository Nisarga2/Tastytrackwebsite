import { StatusCodes } from "http-status-codes";
import Hotel from "../models/Hotel.js";
import { BadRequestError } from "../errors/index.js";

const createHotel = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("Please Provide All Values");
  }
  const hotel = await Hotel.create(req.body);
  res.status(StatusCodes.CREATED).json({ hotel });
};
const deleteJob = async (req, res) => {
  res.send("delete Job");
};
const getAllJobs = async (req, res) => {
  const hotel = await Hotel.find({});
  res.send(hotel).status(200);
};
const updateJob = async (req, res) => {
  res.send("update Job");
};
const showStatus = async (req, res) => {
  res.send("show Status");
};

export { createHotel, deleteJob, getAllJobs, updateJob, showStatus };
