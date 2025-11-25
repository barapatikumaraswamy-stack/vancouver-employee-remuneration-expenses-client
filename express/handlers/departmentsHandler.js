import {
  dbInsertDepartment,
  dbGetDepartmentById,
  dbGetAllDepartments,
  dbGetSimilarDepartments,
} from "../db/departments.js";

 const insertDepartment = (req, res) => {
  const { departmentName } = req.body;
  try {
    const result = dbInsertDepartment(departmentName);
    res
      .status(201)
      .json({ success: true, department_id: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

 const getDepartment = (req, res) => {
  const { departmentId } = req.params;
  try {
    const department = dbGetDepartmentById(Number(departmentId));
    console.log("#########departments", department);
    if (department) {
      res.status(201).json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 const getAllDepartments = (req, res) => {
  console.log("getAllDepartments is been called");
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const departments = dbGetAllDepartments(limit, offset);
    res.status(201).json(departments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

 const getSimilarDepartments = (req, res) => {
  const { name } = req.query;
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const departments = dbGetSimilarDepartments(name || "", limit, offset);
    res.status(201).json(departments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  insertDepartment,
  getDepartment,
  getAllDepartments,
  getSimilarDepartments,
};
