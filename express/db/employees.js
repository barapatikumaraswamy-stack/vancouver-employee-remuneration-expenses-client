import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

const dbInsertEmployee = (name) => {
  return db
    .prepare(
      `
        INSERT INTO employees (name)
        VALUES (?);
      `
    )
    .run(name);
};

const dbGetEmployeeById = (employee_id) => {
  return db
    .prepare(
      `
        SELECT employee_id, name
        FROM employees
        WHERE employee_id = ?;
      `
    )
    .get(employee_id);
};

const dbGetAllEmployees = (limit, offset) => {
  return db
    .prepare(
      `
        SELECT employee_id, name
        FROM employees LIMIT ? OFFSET ?;
      `
    )
    .all(limit, offset);
};

const dbGetSimilarEmployees = (name, limit = 100, offset = 0) => {
  return db
    .prepare(
      `
        SELECT employee_id, name
        FROM employees
        WHERE name LIKE ?  LIMIT ? OFFSET ?;
      `
    )
    .all(`%${name}%`, limit, offset);
};

export {
  dbInsertEmployee,
  dbGetEmployeeById,
  dbGetAllEmployees,
  dbGetSimilarEmployees,
};
