import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
enableForeignKeyConstraints: true,
});

const dbGetRemunerationById = (record_id) => {
return db
.prepare(
SELECT * FROM remuneration_records WHERE record_id = ?;
)
.get(record_id);
};

const dbGetAllRemunerationRecords = (limit = 100, offset = 0) => {
return db
.prepare(
SELECT * FROM remuneration_records LIMIT ? OFFSET ?;
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
let sql = SELECT remuneration_records.record_id, remuneration_records.employee_id, employees.name AS employee_name, remuneration_records.department_id, departments.department_id, departments.department_name, remuneration_records.title_id, titles.title_id, titles.title_name, remuneration_records.year, remuneration_records.remuneration, remuneration_records.expenses FROM remuneration_records JOIN employees ON remuneration_records.employee_id = employees.employee_id JOIN departments ON remuneration_records.department_id = departments.department_id JOIN titles ON remuneration_records.title_id = titles.title_id WHERE 1=1 ;
const params = [];

if (employeeId) {
sql += AND remuneration_records.employee_id = ?;
params.push(Number(employeeId));
}
if (year) {
sql += AND remuneration_records.year = ?;
params.push(Number(year));
}
if (departmentId) {
sql += AND remuneration_records.department_id = ?;
params.push(Number(departmentId));
}
if (titleId) {
sql += AND remuneration_records.title_id = ?;
params.push(Number(titleId));
}
if (minSalary) {
sql += AND remuneration_records.remuneration >= ?;
params.push(Number(minSalary));
}
if (maxSalary) {
sql += AND remuneration_records.remuneration <= ?;
params.push(Number(maxSalary));
}

sql += LIMIT ? OFFSET ?;
params.push(Number(limit), Number(offset));

return db.prepare(sql).all(...params);
};

const dbGetRemunerationWithFeedbackById = (record_id) => {
return db
.prepare(
SELECT * FROM remuneration_with_feedback WHERE record_id = ?;
)
.get(record_id);
};

const dbGetAllRemunerationWithFeedback = (limit = 100, offset = 0) => {
return db
.prepare(
SELECT * FROM remuneration_with_feedback LIMIT ? OFFSET ?;
)
.all(limit, offset);
};

const dbSearchRemunerationWithFeedback = ({
employeeId,
year,
departmentId,
titleId,
minSalary,
maxSalary,
limit = 100,
offset = 0,
}) => {
let sql = SELECT * FROM remuneration_with_feedback WHERE 1=1 ;
const params = [];

if (employeeId) {
sql += AND employee_id = ?;
params.push(Number(employeeId));
}
if (year) {
sql += AND year = ?;
params.push(Number(year));
}
if (departmentId) {
sql += AND department_id = ?;
params.push(Number(departmentId));
}
if (titleId) {
sql += AND title_id = ?;
params.push(Number(titleId));
}
if (minSalary) {
sql += AND remuneration >= ?;
params.push(Number(minSalary));
}
if (maxSalary) {
sql += AND remuneration <= ?;
params.push(Number(maxSalary));
}

sql += LIMIT ? OFFSET ?;
params.push(Number(limit), Number(offset));

return db.prepare(sql).all(...params);
};

export {
dbGetRemunerationById,
dbGetAllRemunerationRecords,
dbSearchRemunerationRecords,
dbGetRemunerationWithFeedbackById,
dbGetAllRemunerationWithFeedback,
dbSearchRemunerationWithFeedback,
};

