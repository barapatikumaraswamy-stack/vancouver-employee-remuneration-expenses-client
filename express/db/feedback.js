import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

const dbInsertFeedback = (employeeId, year, rating, comment) => {
  return db
    .prepare(
      `
        INSERT INTO feedback (employee_id, year, rating, comment)
        VALUES (?, ?, ?, ?);
      `
    )
    .run(employeeId, year, rating, comment);
};

const dbGetFeedback = (employeeId, year) => {
  return db
    .prepare(
      `
        SELECT rating, comment
        FROM feedback
        WHERE employee_id = ? AND year = ?;
      `
    )
    .get(employeeId, year);
};

export { dbInsertFeedback, dbGetFeedback };
