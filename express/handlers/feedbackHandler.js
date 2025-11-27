import {
  dbInsertFeedback,
  dbGetFeedbackByEmployeeAndYear,
  dbUpdateFeedback,
} from "../db/feedback.js";

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

export const getFeedbackForEmployeeYear = (req, res) => {
  const { employeeId, year } = req.query;
  if (!employeeId || !year) {
    return res
      .status(400)
      .json({ success: false, error: "employeeId and year are required" });
  }
  try {
    const rows = dbGetFeedbackByEmployeeAndYear(
      Number(employeeId),
      Number(year)
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const updateFeedback = (req, res) => {
  const { feedbackId } = req.params;
  const { rating, comment } = req.body;

  if (!feedbackId) {
    return res
      .status(400)
      .json({ success: false, error: "feedbackId is required" });
  }

  if (
    rating !== undefined &&
    !["High", "Acceptable", "Low"].includes(rating)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid rating value" });
  }

  try {
    const result = dbUpdateFeedback(Number(feedbackId), { rating, comment });
    if (result.changes === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Feedback not found" });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};
