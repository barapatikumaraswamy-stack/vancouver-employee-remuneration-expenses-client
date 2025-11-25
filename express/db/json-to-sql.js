
// Warning: Please Dont call this script, I'm using this only for initial setup!!!!!!!!!!!!!!!!!!! 
// Fair warning: if you call this script it will reset my data so everything will be a fresh start .



import employeesData from '../internal/employee-remuneration-and-expenses-earning-over-75000.json' with { type: 'json' };
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const db = new DatabaseSync(path.join(import.meta.dirname, 'data.db'), { enableForeignKeyConstraints: true });

db.exec(`CREATE TABLE IF NOT EXISTS convertedemployees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    remuneration REAL DEFAULT 0 NOT NULL,
    expenses REAL DEFAULT 0 NOT NULL,
    year INTEGER NOT NULL
);`);

db.prepare('DELETE FROM convertedemployees;').run();


employeesData.forEach(emp => {
    const remuneration = (emp.remuneration !== undefined && emp.remuneration !== null && emp.remuneration !== "") 
        ? parseFloat(emp.remuneration) 
        : 0;

    const expenses = (emp.expenses !== undefined && emp.expenses !== null && emp.expenses !== "") 
        ? parseFloat(emp.expenses) 
        : 0;

    const year = (emp.year !== undefined && emp.year !== null && emp.year !== "") 
        ? parseInt(emp.year) 
        : 0;

    db.prepare(`
        INSERT INTO convertedemployees (
            name, title, department, remuneration, expenses, year
        ) VALUES (?, ?, ?, ?, ?, ?);
    `).run(
        emp.name || "",
        emp.title || "",
        emp.department || "",
        remuneration,
        expenses,
        year
    ); 
});



db.exec(`

    DROP TABLE IF EXISTS employees;
    DROP TABLE IF EXISTS departments;
    DROP TABLE IF EXISTS titles;
    DROP TABLE IF EXISTS remuneration_records;
    DROP TABLE IF EXISTS feedback;

    CREATE TABLE IF NOT EXISTS employees (
      employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS departments (
      department_id INTEGER PRIMARY KEY AUTOINCREMENT,
      department_name TEXT UNIQUE NOT NULL
    );


    CREATE TABLE IF NOT EXISTS titles (
      title_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_name TEXT UNIQUE NOT NULL
    );


    CREATE TABLE IF NOT EXISTS remuneration_records (
      record_id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      department_id INTEGER NOT NULL,
      title_id INTEGER NOT NULL,
      year INTEGER NOT NULL,
      remuneration REAL NOT NULL,
      expenses REAL NOT NULL,
      FOREIGN KEY(employee_id) REFERENCES employees(employee_id),
      FOREIGN KEY(department_id) REFERENCES departments(department_id),
      FOREIGN KEY(title_id) REFERENCES titles(title_id)
    );


    CREATE TABLE IF NOT EXISTS feedback (
      feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      year INTEGER NOT NULL,
      rating TEXT CHECK (rating IN ('High', 'Low', 'Acceptable')) NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(employee_id) REFERENCES employees(employee_id)
    );
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
      e.employee_id,
      d.department_id,
      t.title_id,
      c.year,
      c.remuneration,
      c.expenses
    FROM convertedemployees c
      JOIN employees e ON c.name = e.name
      JOIN departments d ON c.department = d.department_name
      JOIN titles t ON c.title = t.title_name;
  `);  

db.close();
