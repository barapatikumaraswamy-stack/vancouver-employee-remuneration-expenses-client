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
  if (year == null) {
    return db
      .prepare(`
        SELECT feedback_id, employee_id, year, rating, comment, created_at
        FROM feedback
        WHERE employee_id = ?;
      `)
      .all(employeeId);
  }
  return db
    .prepare(
      `
        SELECT feedback_id, employee_id, year, rating, comment, created_at
        FROM feedback
        WHERE employee_id = ? AND year = ?;
      `
    )
    .all(employeeId, year);
};

const dbGetFeedbackByEmployeeAndYear = (employeeId, year) => {
  return db
    .prepare(
      `
        SELECT feedback_id, employee_id, year, rating, comment, created_at
        FROM feedback
        WHERE employee_id = ? AND year = ?
        ORDER BY created_at DESC;
      `
    )
    .all(employeeId, year);
};

const dbUpdateFeedback = (feedbackId, { rating, comment }) => {
  const fields = [];
  const params = [];

  if (rating !== undefined) {
    fields.push("rating = ?");
    params.push(rating);
  }
  if (comment !== undefined) {
    fields.push("comment = ?");
    params.push(comment);
  }

  if (fields.length === 0) {
    return { changes: 0 };
  }

  params.push(feedbackId);

  const sql = `
    UPDATE feedback
    SET ${fields.join(", ")}
    WHERE feedback_id = ?;
  `;

  return db.prepare(sql).run(...params);
};

export {
  dbInsertFeedback,
  dbGetFeedback,
  dbGetFeedbackByEmployeeAndYear,
  dbUpdateFeedback,
};
