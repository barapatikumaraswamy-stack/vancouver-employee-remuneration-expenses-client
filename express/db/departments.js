import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

const dbInsertDepartment = (departmentName) => {
  return db
    .prepare(
      `
        INSERT INTO departments (department_name)
        VALUES (?);
      `
    )
    .run(departmentName);
};

const dbGetDepartmentById = (department_id) => {
  return db
    .prepare(
      `
        SELECT department_id, department_name
        FROM departments
        WHERE department_id = ?;
      `
    )
    .get(department_id);
};

// default values are not needed but as a safe proofing added them.
const dbGetAllDepartments = (limit = 100, offset = 0) => {
  console.log("#########departments", limit, offset);
  return db
    .prepare(
      `
        SELECT department_id, department_name
        FROM departments
        LIMIT ? OFFSET ?;
      `
    )
    .all(limit, offset);
};

const dbGetSimilarDepartments = (name, limit = 100, offset = 0) => {
  return db
    .prepare(
      `
        SELECT department_id, department_name
        FROM departments
        WHERE department_name LIKE ?
        LIMIT ? OFFSET ?;
      `
    )
    .all(`%${name}%`, limit, offset);
};

export {
  dbInsertDepartment,
  dbGetDepartmentById,
  dbGetAllDepartments,
  dbGetSimilarDepartments,
};
