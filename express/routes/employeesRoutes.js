import express from "express";
import {
  insertEmployee,
  getEmployee,
  getAllEmployees,
  getSimilarEmployees,
} from "../handlers/employeesHandler.js";

export default function employeeRoutes() {
  const router = express.Router();
  router.get("/search", getSimilarEmployees);
  router.get("/all", getAllEmployees);
  router.get("/:employeeId", getEmployee);
  router.post("/post", insertEmployee);
  
  
  return router;
}
