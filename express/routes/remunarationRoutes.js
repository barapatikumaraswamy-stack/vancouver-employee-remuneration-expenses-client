import express from "express";
import {
  getRemunerationById,
  getAllRemunerationRecords,
  searchRemunerationRecords,
} from "../handlers/remunarationHandler.js";

export default function remunerationRoutes() {
  const router = express.Router();

  
  
  router.get("/search", searchRemunerationRecords);
  router.get("/:recordId", getRemunerationById);
  router.get("/", getAllRemunerationRecords);
  return router;
}
