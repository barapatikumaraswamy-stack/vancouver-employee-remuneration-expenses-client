import express from "express";
import {
  insertDepartment,
  getDepartment,
  getAllDepartments,
  getSimilarDepartments,
} from "../handlers/departmentsHandler.js";
import { validateDepartmentBody } from "../middleware/validation.js";

export default function departmentRoutes() {
  console.log("departmentRoutes has been called");

  const router = express.Router();
  router.get("/all", getAllDepartments);
  router.get("/search", getSimilarDepartments);
  router.post("/post", validateDepartmentBody, insertDepartment);
  router.get("/:departmentId", getDepartment);

  return router;
}
