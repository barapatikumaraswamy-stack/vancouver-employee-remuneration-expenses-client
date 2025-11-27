import express from "express";
import {
  insertFeedback,
  getFeedbackForEmployeeYear,
  updateFeedback,
} from "../handlers/feedbackHandler.js";

export default function feedbackRoutes() {
  const router = express.Router();
  router.post("/", insertFeedback);
  router.get("/", getFeedbackForEmployeeYear);
  router.patch("/:feedbackId", updateFeedback);
  return router;
}
