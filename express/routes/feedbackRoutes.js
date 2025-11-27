import express from "express";
import {
  insertFeedback,
  getFeedbackForEmployeeYear,
  updateFeedback,
} from "../handlers/feedbackHandler.js";
import {validateFeedbackUpdateBody, validateFeedbackBody}  from "../middleware/validation.js";

export default function feedbackRoutes() {
  const router = express.Router();
  router.post("/", validateFeedbackBody, insertFeedback);
  router.get("/", getFeedbackForEmployeeYear);
  router.patch("/:feedbackId", validateFeedbackUpdateBody, updateFeedback);
  return router;
}
