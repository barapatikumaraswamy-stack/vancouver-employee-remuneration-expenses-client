import {
  dbInsertEmployee,
  dbGetEmployeeById,
  dbGetAllEmployees,
  dbGetSimilarEmployees,
} from "../db/employees.js";

export const insertEmployee = (req, res) => {
  const { name } = req.body;
  try {
    const result = dbInsertEmployee(name);
    res
      .status(201)
      .json({ success: true, employee_id: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getEmployee = (req, res) => {
  const { employeeId } = req.params;
  try {
    const employee = dbGetEmployeeById(Number(employeeId));
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllEmployees = (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const offset = req.query.offset ? Number(req.query.offset) : 0;
    const employees = dbGetAllEmployees(limit, offset);
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSimilarEmployees = (req, res) => {
  const { name } = req.query;
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const employees = dbGetSimilarEmployees(name || "", limit, offset);
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
