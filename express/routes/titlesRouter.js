import express from "express";
import {
  insertTitle,
  getTitleById,
  getAllTitles,
  getSimilarTitles,
} from "../handlers/titleHandler.js";
import { validateTitleBody } from "../middleware/validation.js";

export default function departmentRoutes() {
  console.log("departmentRoutes has been called");
  const router = express.Router();
  router.post("/", validateTitleBody, insertTitle);
  router.get("/search", getSimilarTitles);
  router.get("/all", getAllTitles);
  router.get("/:id", getTitleById);
  return router;
}
