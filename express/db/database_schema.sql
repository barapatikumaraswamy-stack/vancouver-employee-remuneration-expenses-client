CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE departments (
  department_id INTEGER PRIMARY KEY AUTOINCREMENT,
  department_name TEXT UNIQUE NOT NULL
);

CREATE TABLE titles (
  title_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_name TEXT UNIQUE NOT NULL
);

CREATE TABLE remuneration_records (
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

CREATE TABLE feedback (
  feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL,
  year INTEGER NOT NULL,
  rating TEXT CHECK (rating IN ('High', 'Low', 'Acceptable')) NOT NULL,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

  