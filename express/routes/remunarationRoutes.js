import express from "express";
import {
  getRemunerationById,
  getAllRemunerationRecords,
  searchRemunerationRecords,
  getRemunerationWithFeedbackById,
  getAllRemunerationWithFeedback,
  searchRemunerationWithFeedback,
} from "../handlers/remunarationHandler.js";
import { validateSearchRemunerationQuery } from "../middleware/validation.js";

export default function remunerationRoutes() {
  const router = express.Router();

  router.get(
    "/search",
    validateSearchRemunerationQuery,
    searchRemunerationRecords
  );
  router.get("/:recordId", getRemunerationById);
  router.get("/", getAllRemunerationRecords);

  router.get(
    "/with-feedback/search",
    validateSearchRemunerationQuery,
    searchRemunerationWithFeedback
  );
   router.get("/with-feedback/all", getAllRemunerationWithFeedback);
  router.get("/with-feedback/:recordId", getRemunerationWithFeedbackById);
 

  return router;
}
