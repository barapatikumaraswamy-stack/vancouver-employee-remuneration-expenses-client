import { dbInsertFeedback, dbGetFeedback } from "../db/feedback.js";

export const insertFeedback = (req, res) => {
  const { employeeId, year, rating, comment } = req.body;
  try {
    const result = dbInsertFeedback(employeeId, year, rating, comment);
    res
      .status(201)
      .json({ success: true, feedback_id: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getFeedback = (req, res) => {
  const { employeeId, year } = req.query;
  try {
    const feedback = dbGetFeedback(Number(employeeId), Number(year));
    if (feedback) {
      res.status(201).json(feedback);
    } else {
      res.status(404).json({ error: "Feedback not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
