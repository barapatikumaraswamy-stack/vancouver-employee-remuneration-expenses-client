export const validateSearchRemunerationQuery = (req, res, next) => {
  const { employeeId, departmentId, titleId, year, limit, offset } = req.query;

  if (employeeId && (isNaN(employeeId) || Number(employeeId) < 1)) {
    return res.status(400).json({ error: "employeeId must be positive number" });
  }
  if (departmentId && (isNaN(departmentId) || Number(departmentId) < 1)) {
    return res.status(400).json({ error: "departmentId must be positive number" });
  }
  if (titleId && (isNaN(titleId) || Number(titleId) < 1)) {
    return res.status(400).json({ error: "titleId must be positive number" });
  }
  if (year && (isNaN(year) || Number(year) < 1900)) {
    return res.status(400).json({ error: "year must be valid year" });
  }
  if (limit && (isNaN(limit) || Number(limit) < 1 || Number(limit) > 1000)) {
    return res.status(400).json({ error: "limit must be between 1 and 1000" });
  }
  if (offset && (isNaN(offset) || Number(offset) < 0)) {
    return res.status(400).json({ error: "offset must be non-negative" });
  }

  next();
};

export const validateFeedbackBody = (req, res, next) => {
  const { employeeId, year, rating, comment } = req.body;

  if (!employeeId || isNaN(employeeId) || Number(employeeId) < 1) {
    return res.status(400).json({ error: "employeeId required, must be positive" });
  }
  if (!year || isNaN(year) || Number(year) < 1900) {
    return res.status(400).json({ error: "year required, must be valid" });
  }
  if (!rating || !["High", "Acceptable", "Low"].includes(rating)) {
    return res.status(400).json({ error: "rating must be High, Acceptable, or Low" });
  }
  if (comment && typeof comment !== "string") {
    return res.status(400).json({ error: "comment must be string" });
  }

  next();
};

export const validateFeedbackUpdateBody = (req, res, next) => {
  const { rating, comment } = req.body;

  if (rating && !["High", "Acceptable", "Low"].includes(rating)) {
    return res.status(400).json({ error: "rating must be High, Acceptable, or Low" });
  }
  if (comment && typeof comment !== "string") {
    return res.status(400).json({ error: "comment must be string" });
  }

  next();
};
