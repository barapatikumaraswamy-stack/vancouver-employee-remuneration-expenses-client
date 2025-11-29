import {
  dbGetRemunerationById,
  dbGetAllRemunerationRecords,
  dbSearchRemunerationRecords,
  dbGetRemunerationWithFeedbackById,
  dbGetAllRemunerationWithFeedback,
  dbSearchRemunerationWithFeedback,
} from "../db/remunaration.js";

const getRemunerationById = (req, res) => {
  const { recordId } = req.params;
  try {
    const remuneration = dbGetRemunerationById(Number(recordId));
    if (remuneration) {
      res.status(200).json(remuneration);
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
    if (remuneration && remuneration.length > 0) {
      res.status(200).json(remuneration);
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
    limit,
    offset,
  } = req.query;

  try {
    const rows = dbSearchRemunerationRecords({
      employeeId,
      year,
      departmentId,
      titleId,
      minSalary,
      maxSalary,
      limit: limit || 50,
      offset: offset || 0,
    });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRemunerationWithFeedbackById = (req, res) => {
  const { recordId } = req.params;
  try {
    const row = dbGetRemunerationWithFeedbackById(Number(recordId));
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ error: "Remuneration not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllRemunerationWithFeedback = (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  try {
    const rows = dbGetAllRemunerationWithFeedback(limit, offset);
    if (rows && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ error: "Remuneration not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchRemunerationWithFeedback = (req, res) => {
  const {
    employeeId,
    year,
    departmentId,
    titleId,
    minSalary,
    maxSalary,
    limit,
    offset,
  } = req.query;

  try {
    const rows = dbSearchRemunerationWithFeedback({
      employeeId,
      year,
      departmentId,
      titleId,
      minSalary,
      maxSalary,
      limit: limit || 50,
      offset: offset || 0,
    });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getRemunerationById,
  getAllRemunerationRecords,
  searchRemunerationRecords,
  getRemunerationWithFeedbackById,
  getAllRemunerationWithFeedback,
  searchRemunerationWithFeedback,
};
