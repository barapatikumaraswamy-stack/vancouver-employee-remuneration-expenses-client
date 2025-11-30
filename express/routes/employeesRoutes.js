import express from "express";
import {
  insertEmployee,
  getEmployee,
  getAllEmployees,
  getSimilarEmployees,
} from "../handlers/employeesHandler.js";
import { validateNameBody } from "../middleware/validation.js";

export default function employeeRoutes() {
  const router = express.Router();
  router.get("/search", getSimilarEmployees);
  router.get("/all", getAllEmployees);
  router.get("/:employeeId", getEmployee);
  router.post("/post", validateNameBody, insertEmployee);

  return router;
}
