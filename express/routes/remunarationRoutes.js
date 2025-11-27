import express from "express";
import {
  getRemunerationById,
  getAllRemunerationRecords,
  searchRemunerationRecords,
} from "../handlers/remunarationHandler.js";
import {validateSearchRemunerationQuery} from "../middleware/validation.js";

export default function remunerationRoutes() {
  const router = express.Router();

  
  
  router.get("/search", validateSearchRemunerationQuery, searchRemunerationRecords);
  router.get("/:recordId", getRemunerationById);
  router.get("/", getAllRemunerationRecords);
  return router;
}
