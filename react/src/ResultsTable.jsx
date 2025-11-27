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
  feedbackList,
  loadFeedbackForRow,
  handleSubmitFeedback,
  editingFeedbackId,
  setEditingFeedbackId,
  editingRating,
  setEditingRating,
  editingComment,
  setEditingComment,
  handleUpdateFeedback,
}) => {
  return (
    <>
      <div className="rem-table-header">
        <div className="rem-table-title">Remuneration results</div>
        <div className="rem-table-subtitle">
          {results.length} record{results.length === 1 ? "" : "s"} shown
        </div>
      </div>

      <table className="rem-classic-table">
        <thead>
          <tr>
            {visibleFields.employee && <th>Employee</th>}
            {visibleFields.department && <th>Department</th>}
            {visibleFields.title && <th>Title</th>}
            {visibleFields.year && <th>Year</th>}
            {visibleFields.remuneration && <th>Remuneration</th>}
            {visibleFields.expenses && <th>Expenses</th>}
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
                      onClick={async () => {
                        const isSame =
                          activeFeedbackRecordId === row.record_id;
                        if (isSame) {
                          setActiveFeedbackRecordId(null);
                          setFeedbackMessage("");
                          setEditingFeedbackId(null);
                          return;
                        }
                        setActiveFeedbackRecordId(row.record_id);
                        setFeedbackEmployeeId(row.employee_id);
                        setFeedbackYear(row.year);
                        setFeedbackRating("High");
                        setFeedbackComment("");
                        setFeedbackMessage("");
                        setEditingFeedbackId(null);
                        await loadFeedbackForRow(row.employee_id, row.year);
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

                        {feedbackList.length > 0 && (
                          <ul className="rem-feedback-list">
                            {feedbackList.map((fb) => (
                              <li key={fb.feedback_id}>
                                <span>
                                  [{fb.rating}]{" "}
                                  {fb.comment || "(no comment)"}
                                </span>
                                <button
                                  type="button"
                                  style={{ marginLeft: "0.5rem" }}
                                  onClick={() => {
                                    setEditingFeedbackId(fb.feedback_id);
                                    setEditingRating(fb.rating);
                                    setEditingComment(fb.comment || "");
                                    setFeedbackMessage("");
                                  }}
                                >
                                  Edit
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

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
                              <option value="Acceptable">
                                Acceptable
                              </option>
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

                        {editingFeedbackId && (
                          <form
                            onSubmit={handleUpdateFeedback}
                            className="rem-feedback-form"
                          >
                            <div>Edit existing feedback</div>
                            <div>
                              <label>Rating</label>
                              <select
                                value={editingRating}
                                onChange={(e) =>
                                  setEditingRating(e.target.value)
                                }
                              >
                                <option value="High">High</option>
                                <option value="Acceptable">
                                  Acceptable
                                </option>
                                <option value="Low">Low</option>
                              </select>
                            </div>

                            <div>
                              <label>Comment</label>
                              <textarea
                                value={editingComment}
                                onChange={(e) =>
                                  setEditingComment(e.target.value)
                                }
                              />
                            </div>

                            <button type="submit">Update feedback</button>
                          </form>
                        )}

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
