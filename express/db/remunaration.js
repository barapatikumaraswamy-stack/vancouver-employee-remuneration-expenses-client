import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

const dbGetRemunerationById = (record_id) => {
  return db
    .prepare(
      `
          SELECT *
          FROM remuneration_records
          WHERE record_id = ?;
        `
    )
    .get(record_id);
};

const dbGetAllRemunerationRecords = (limit = 100, offset = 0) => {
  return db
    .prepare(
      `
          SELECT *
          FROM remuneration_records
          LIMIT ? OFFSET ?;
        `
    )
    .all(limit, offset);
};

const dbSearchRemunerationRecords = ({
  employeeId,
  year,
  departmentId,
  titleId,
  minSalary,
  maxSalary,
  limit = 100,
  offset = 0,
}) => {
  let sql = `SELECT * FROM remuneration_records WHERE 1=1`;
  let params = [];
  if (employeeId) {
    sql += ` AND employee_id = ?`;
    params.push(employeeId);
  }
  if (year) {
    sql += ` AND year = ?`;
    params.push(year);
  }
  if (departmentId) {
    sql += ` AND department_id = ?`;
    params.push(departmentId);
  }
  if (titleId) {
    sql += ` AND title_id = ?`;
    params.push(titleId);
  }
  if (minSalary) {
    sql += ` AND remuneration >= ?`;
    params.push(minSalary);
  }
  if (maxSalary) {
    sql += ` AND remuneration <= ?`;
    params.push(maxSalary);
  }
  sql += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return db.prepare(sql).all(...params);
};

export {
  dbGetRemunerationById,
  dbGetAllRemunerationRecords,
  dbSearchRemunerationRecords,
};
