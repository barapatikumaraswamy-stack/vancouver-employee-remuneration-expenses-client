import express from "express";
import { insertFeedback, getFeedback } from "../handlers/feedbackHandler.js";

export default function feedbackRoutes() {
  const router = express.Router();
  router.post("/", insertFeedback);
  router.get("/feedback", getFeedback);
  return router;
}
