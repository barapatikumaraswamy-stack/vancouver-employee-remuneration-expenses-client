
DROP VIEW IF EXISTS remuneration_with_feedback;
DROP TRIGGER IF EXISTS feedback_insert_update_summary;
DROP TABLE IF EXISTS feedback_summary;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS remuneration_records;
DROP TABLE IF EXISTS titles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;

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
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id),
  FOREIGN KEY (title_id) REFERENCES titles(title_id)
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


CREATE TABLE feedback_summary (
  employee_id INTEGER NOT NULL,
  year INTEGER NOT NULL,
  high_count INTEGER NOT NULL DEFAULT 0,
  acceptable_count INTEGER NOT NULL DEFAULT 0,
  low_count INTEGER NOT NULL DEFAULT 0,
  total_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (employee_id, year),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


CREATE TRIGGER feedback_insert_update_summary
AFTER INSERT ON feedback
BEGIN
  INSERT INTO feedback_summary (
    employee_id,
    year,
    high_count,
    acceptable_count,
    low_count,
    total_count
  )
  VALUES (
    NEW.employee_id,
    NEW.year,
    CASE WHEN NEW.rating = 'High' THEN 1 ELSE 0 END,
    CASE WHEN NEW.rating = 'Acceptable' THEN 1 ELSE 0 END,
    CASE WHEN NEW.rating = 'Low' THEN 1 ELSE 0 END,
    1
  )
  ON CONFLICT(employee_id, year) DO UPDATE SET
    high_count = high_count + CASE WHEN NEW.rating = 'High' THEN 1 ELSE 0 END,
    acceptable_count = acceptable_count + CASE WHEN NEW.rating = 'Acceptable' THEN 1 ELSE 0 END,
    low_count = low_count + CASE WHEN NEW.rating = 'Low' THEN 1 ELSE 0 END,
    total_count = total_count + 1;
END;


CREATE VIEW remuneration_with_feedback AS
SELECT
  remuneration_records.record_id,
  remuneration_records.employee_id,
  employees.name AS employee_name,
  remuneration_records.department_id,
  departments.department_name,
  remuneration_records.title_id,
  titles.title_name,
  remuneration_records.year,
  remuneration_records.remuneration,
  remuneration_records.expenses,
  COALESCE(SUM(CASE WHEN feedback.rating = 'High' THEN 1 ELSE 0 END), 0)        AS high_rating_count,
  COALESCE(SUM(CASE WHEN feedback.rating = 'Acceptable' THEN 1 ELSE 0 END), 0)  AS acceptable_rating_count,
  COALESCE(SUM(CASE WHEN feedback.rating = 'Low' THEN 1 ELSE 0 END), 0)         AS low_rating_count,
  COALESCE(COUNT(feedback.feedback_id), 0)                                      AS total_feedback_count
FROM remuneration_records
JOIN employees
  ON remuneration_records.employee_id = employees.employee_id
JOIN departments
  ON remuneration_records.department_id = departments.department_id
JOIN titles
  ON remuneration_records.title_id = titles.title_id
LEFT JOIN feedback
  ON feedback.employee_id = remuneration_records.employee_id
 AND feedback.year        = remuneration_records.year
GROUP BY
  remuneration_records.record_id,
  remuneration_records.employee_id,
  remuneration_records.department_id,
  remuneration_records.title_id,
  remuneration_records.year,
  remuneration_records.remuneration,
  remuneration_records.expenses,
  employees.name,
  departments.department_name,
  titles.title_name;


CREATE INDEX idx_remuneration_employee_year
ON remuneration_records (employee_id, year);

CREATE INDEX idx_remuneration_department_title_year
ON remuneration_records (department_id, title_id, year);

CREATE INDEX idx_feedback_employee_year
ON feedback (employee_id, year);
