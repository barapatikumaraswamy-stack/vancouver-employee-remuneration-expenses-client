import express from "express";
import { insertTitle, getTitleById, getAllTitles, getSimilarTitles } from "../handlers/titleHandler.js";

export default function departmentRoutes() {
  console.log("departmentRoutes has been called");
  const router = express.Router();
  router.post("/", insertTitle);
  router.get("/search", getSimilarTitles);
  router.get("/all", getAllTitles);
  router.get("/:id", getTitleById);
  return router;
}
