import {
  dbGetRemunerationById,
  dbGetAllRemunerationRecords,
  dbSearchRemunerationRecords,
} from "../db/remunaration.js";

const getRemunerationById = (req, res) => {
  const { recordId } = req.query;
  try {
    const remuneration = dbGetRemunerationById(Number(recordId));
    if (remuneration) {
      res.status(201).json(remuneration);
    } else {
      res.status(404).json({ error: "Remuneration not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllRemunerationRecords = (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const remuneration = dbGetAllRemunerationRecords(limit, offset);
    if (remuneration) {
      res.status(201).json(remuneration);
    } else {
      res.status(404).json({ error: "Remuneration not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchRemunerationRecords = (req, res) => {
  const {
    employeeId,
    year,
    departmentId,
    titleId,
    minSalary,
    maxSalary,
    limit = 100,
    offset = 0,
  } = req.query;
  try {
    const remuneration = dbSearchRemunerationRecords({
      employeeId,
      year,
      departmentId,
      titleId,
      minSalary,
      maxSalary,
      limit,
      offset,
    });
    if (remuneration) {
      res.status(201).json(remuneration);
    } else {
      res.status(404).json({ error: "Remuneration not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  getRemunerationById,
  getAllRemunerationRecords,
  searchRemunerationRecords,
};
