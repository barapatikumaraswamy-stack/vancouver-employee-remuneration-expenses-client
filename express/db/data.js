import employeesData from "../internal/employee-remuneration-and-expenses-earning-over-75000.json" with { type: "json" };
import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

db.exec(`
  DROP TABLE IF EXISTS convertedemployees;

  CREATE TABLE convertedemployees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    remuneration REAL DEFAULT 0 NOT NULL,
    expenses REAL DEFAULT 0 NOT NULL,
    year INTEGER NOT NULL
  );
`);


employeesData.forEach((emp) => {
  const remuneration =
    emp.remuneration !== undefined &&
    emp.remuneration !== null &&
    emp.remuneration !== ""
      ? parseFloat(emp.remuneration)
      : 0;

  const expenses =
    emp.expenses !== undefined &&
    emp.expenses !== null &&
    emp.expenses !== ""
      ? parseFloat(emp.expenses)
      : 0;

  const year =
    emp.year !== undefined && emp.year !== null && emp.year !== ""
      ? parseInt(emp.year)
      : 0;

  db.prepare(
    `
      INSERT INTO convertedemployees (
        name, title, department, remuneration, expenses, year
      ) VALUES (?, ?, ?, ?, ?, ?);
    `
  ).run(emp.name || "", emp.title || "", emp.department || "", remuneration, expenses, year);
});

db.exec(`
  DELETE FROM employees;
  DELETE FROM departments;
  DELETE FROM titles;
  DELETE FROM remuneration_records;
  DELETE FROM feedback;
  DELETE FROM feedback_summary;
`);

db.exec(`
  INSERT INTO employees (name)
    SELECT DISTINCT name FROM convertedemployees;

  INSERT INTO departments (department_name)
    SELECT DISTINCT department FROM convertedemployees;

  INSERT INTO titles (title_name)
    SELECT DISTINCT title FROM convertedemployees;
`);

db.exec(`
  INSERT INTO remuneration_records (
    employee_id, department_id, title_id, year, remuneration, expenses
  )
  SELECT
    employees.employee_id,
    departments.department_id,
    titles.title_id,
    convertedemployees.year,
    convertedemployees.remuneration,
    convertedemployees.expenses
  FROM convertedemployees
    JOIN employees ON convertedemployees.name = employees.name
    JOIN departments ON convertedemployees.department = departments.department_name
    JOIN titles ON convertedemployees.title = titles.title_name;
`);

db.close();
