import React from "react";

const ResultsTable = ({
  results,
  loading,
  visibleFields,
  visibleColCount,
  activeFeedbackRecordId,
  setActiveFeedbackRecordId,
  feedbackEmployeeId,
  setFeedbackEmployeeId,
  feedbackYear,
  setFeedbackYear,
  feedbackRating,
  setFeedbackRating,
  feedbackComment,
  setFeedbackComment,
  feedbackMessage,
  setFeedbackMessage,
  handleSubmitFeedback,
  sortColumn,
  sortDirection,
  handleSort,
}) => {
  const renderSortIndicator = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <>
      <table className="rem-classic-table">
        <thead>
          <tr>
            {visibleFields.employee && (
              <th onClick={() => handleSort("employee_name")}>
                Employee{renderSortIndicator("employee_name")}
              </th>
            )}
            {visibleFields.department && (
              <th onClick={() => handleSort("department_name")}>
                Department{renderSortIndicator("department_name")}
              </th>
            )}
            {visibleFields.title && (
              <th onClick={() => handleSort("title_name")}>
                Title{renderSortIndicator("title_name")}
              </th>
            )}
            {visibleFields.year && (
              <th onClick={() => handleSort("year")}>
                Year{renderSortIndicator("year")}
              </th>
            )}
            {visibleFields.remuneration && (
              <th onClick={() => handleSort("remuneration")}>
                Remuneration{renderSortIndicator("remuneration")}
              </th>
            )}
            {visibleFields.expenses && (
              <th onClick={() => handleSort("expenses")}>
                Expenses{renderSortIndicator("expenses")}
              </th>
            )}
            {visibleFields.feedback && <th>Feedback</th>}
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <React.Fragment key={row.record_id}>
              <tr>
                {visibleFields.employee && (
                  <td>{row.employee_name || row.name}</td>
                )}
                {visibleFields.department && <td>{row.department_name}</td>}
                {visibleFields.title && <td>{row.title_name}</td>}
                {visibleFields.year && <td>{row.year}</td>}
                {visibleFields.remuneration && <td>{row.remuneration}</td>}
                {visibleFields.expenses && <td>{row.expenses}</td>}
                {visibleFields.feedback && (
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        const isSame = activeFeedbackRecordId === row.record_id;
                        if (isSame) {
                          setActiveFeedbackRecordId(null);
                          setFeedbackMessage("");
                          return;
                        }
                        setActiveFeedbackRecordId(row.record_id);
                        setFeedbackEmployeeId(row.employee_id);
                        setFeedbackYear(row.year);
                        setFeedbackRating("High");
                        setFeedbackComment("");
                        setFeedbackMessage("");
                      }}
                    >
                      {activeFeedbackRecordId === row.record_id
                        ? "Close"
                        : "Feedback"}
                    </button>
                  </td>
                )}
              </tr>

              {activeFeedbackRecordId === row.record_id &&
                visibleFields.feedback && (
                  <tr>
                    <td colSpan={visibleColCount}>
                      <div className="rem-feedback-block">
                        <strong>
                          Feedback for {row.employee_name || row.name} (
                          {row.year})
                        </strong>

                        <div className="rem-feedback-summary">
                          <div>Total: {row.total_feedback_count ?? 0}</div>
                          <div>
                            High: {row.high_rating_count ?? 0} | Acceptable:{" "}
                            {row.acceptable_rating_count ?? 0} | Low:{" "}
                            {row.low_rating_count ?? 0}
                          </div>
                        </div>

                        <form
                          onSubmit={handleSubmitFeedback}
                          className="rem-feedback-form"
                        >
                          <div>New feedback</div>
                          <div>
                            <label>Rating</label>
                            <select
                              value={feedbackRating}
                              onChange={(e) =>
                                setFeedbackRating(e.target.value)
                              }
                            >
                              <option value="High">High</option>
                              <option value="Acceptable">Acceptable</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>

                          <div>
                            <label>Comment</label>
                            <textarea
                              value={feedbackComment}
                              onChange={(e) =>
                                setFeedbackComment(e.target.value)
                              }
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={!feedbackEmployeeId || !feedbackYear}
                          >
                            Save new feedback
                          </button>
                        </form>

                        {feedbackMessage && (
                          <span className="rem-feedback-message">
                            {feedbackMessage}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          ))}

          {!loading && results.length === 0 && (
            <tr>
              <td colSpan={visibleColCount} style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ResultsTable;
