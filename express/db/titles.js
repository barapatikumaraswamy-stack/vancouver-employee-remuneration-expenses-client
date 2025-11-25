import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(import.meta.dirname, "data.db"), {
  enableForeignKeyConstraints: true,
});

const dbinsertTitle = (titleName) => {
  return db
    .prepare(
      `
        INSERT INTO titles (title_name)
        VALUES (?);
      `
    )
    .run(titleName);
};

const dbGetTitleById = (title_id) => {
  return db
    .prepare(
      `
        SELECT title_name
        FROM titles
        WHERE title_id = ?;
      `
    )
    .get(title_id);
};

const dbGetAllTitles = (limit, offset) => {
  return db
    .prepare(
      `
        SELECT title_id, title_name
        FROM titles LIMIT ? OFFSET ?;
      `
    )
    .all(limit, offset);
};

const dbGetSimilarTitles = (titleName, limit, offset) => {
  return db
    .prepare(
      `
        SELECT title_id, title_name
        FROM titles
        WHERE title_name LIKE ? LIMIT ? OFFSET ?;
      `
    )
    .all(`%${titleName}%`, limit, offset);
};

export { dbinsertTitle, dbGetTitleById, dbGetAllTitles, dbGetSimilarTitles };
