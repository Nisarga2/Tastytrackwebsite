import express from "express";
const router = express.Router();

import {
  createHotel,
  deleteJob,
  getAllJobs,
  updateJob,
  showStatus,
} from "../controller/hotelController.js";

router.route("/").post(createHotel).get(getAllJobs);
// * place before :id
router.route("/stats").get(showStatus);
router.route("/:id").delete(deleteJob).patch(updateJob);
export default router;
