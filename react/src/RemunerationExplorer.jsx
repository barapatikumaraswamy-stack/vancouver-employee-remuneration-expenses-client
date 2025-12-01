import React, { useEffect, useState } from "react";
import Filters from "./Filters.jsx";
import ResultsTable from "./ResultsTable.jsx";
import "./RemunerationExplorer.css";

const API_BASE_URL =
  "https://vancouver-employee-remuneration-expenses.onrender.com/v1";

const RemunerationExplorer = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [titles, setTitles] = useState([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [visibleFields, setVisibleFields] = useState({
    employee: true,
    department: true,
    title: true,
    year: true,
    remuneration: true,
    expenses: true,
    feedback: true,
  });

  const [activeFeedbackRecordId, setActiveFeedbackRecordId] = useState(null);
  const [feedbackEmployeeId, setFeedbackEmployeeId] = useState("");
  const [feedbackYear, setFeedbackYear] = useState("");
  const [feedbackRating, setFeedbackRating] = useState("High");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackJustSaved, setFeedbackJustSaved] = useState(false);

  const [lastFeedbackId, setLastFeedbackId] = useState(null);
  const [lastFeedbackRating, setLastFeedbackRating] = useState("High");
  const [lastFeedbackComment, setLastFeedbackComment] = useState("");

  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    loadEmployees();
    loadDepartments();
    loadTitles();
  }, []);

  useEffect(() => {
    if (!activeFeedbackRecordId) return;
    setFeedbackRating("High");
    setFeedbackComment("");
    setFeedbackMessage("");
    setLastFeedbackId(null);
    setLastFeedbackRating("High");
    setLastFeedbackComment("");
  }, [activeFeedbackRecordId]);

  const loadEmployees = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employees/all?limit=10000&offset=0`
      );
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/departments/all?limit=10000&offset=0`
      );
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTitles = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/titles/all?limit=100000&offset=0`
      );
      const data = await response.json();
      setTitles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const buildSearchUrl = () => {
    const url = new URL(`${API_BASE_URL}/remuneration/with-feedback/search`);
    if (selectedEmployeeId)
      url.searchParams.set("employeeId", selectedEmployeeId);
    if (selectedDepartmentId)
      url.searchParams.set("departmentId", selectedDepartmentId);
    if (selectedTitleId) url.searchParams.set("titleId", selectedTitleId);
    if (year) url.searchParams.set("year", year);
    if (limit) url.searchParams.set("limit", limit);
    if (offset) url.searchParams.set("offset", offset);
    return url.toString();
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const url = buildSearchUrl();
      const response = await fetch(url);
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to fetch data");
      }
      const data = await response.json();
      let resArray = Array.isArray(data) ? data : [data];

      if (sortColumn) {
        resArray.sort((a, b) => {
          const valA = a[sortColumn];
          const valB = b[sortColumn];
          if (typeof valA === "number" && typeof valB === "number") {
            return sortDirection === "asc" ? valA - valB : valB - valA;
          }
          const strA = (valA || "").toString().toLowerCase();
          const strB = (valB || "").toString().toLowerCase();
          if (strA < strB) return sortDirection === "asc" ? -1 : 1;
          if (strA > strB) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }

      setResults(resArray);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedEmployeeId("");
    setSelectedDepartmentId("");
    setSelectedTitleId("");
    setYear("");
    setOffset(0);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setFeedbackMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: Number(feedbackEmployeeId),
          year: Number(feedbackYear),
          rating: feedbackRating,
          comment: feedbackComment,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback");
      }
      setFeedbackMessage("Feedback submitted.");
      setFeedbackComment("");
      setFeedbackJustSaved(true);
      setLastFeedbackId(data.feedback_id);
      setLastFeedbackRating(feedbackRating);
      setLastFeedbackComment(feedbackComment);
    } catch (err) {
      setFeedbackMessage(err.message);
    }
  };

  const handleUpdateLastFeedback = async (e) => {
    e.preventDefault();
    if (!lastFeedbackId) return;
    setFeedbackMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/feedback/${lastFeedbackId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating: lastFeedbackRating,
            comment: lastFeedbackComment,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update feedback");
      }
      setFeedbackMessage("Last feedback updated.");
      setFeedbackJustSaved(true);
    } catch (err) {
      setFeedbackMessage(err.message);
    }
  };

  useEffect(() => {
    if (
      feedbackJustSaved &&
      activeFeedbackRecordId &&
      feedbackEmployeeId &&
      feedbackYear
    ) {
      handleSearch();
      setFeedbackJustSaved(false);
    }
  }, [
    feedbackJustSaved,
    activeFeedbackRecordId,
    feedbackEmployeeId,
    feedbackYear,
  ]);

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    handleSearch();
  }, [offset, limit, sortColumn, sortDirection]);

  const visibleColCount =
    Object.values(visibleFields).filter((v) => v).length || 1;

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="rem-container">
      <h1>Vancouver Remuneration Explorer</h1>

      <Filters
        employees={employees}
        departments={departments}
        titles={titles}
        selectedEmployeeId={selectedEmployeeId}
        setSelectedEmployeeId={setSelectedEmployeeId}
        selectedDepartmentId={selectedDepartmentId}
        setSelectedDepartmentId={setSelectedDepartmentId}
        selectedTitleId={selectedTitleId}
        setSelectedTitleId={setSelectedTitleId}
        year={year}
        setYear={setYear}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        handleSearch={handleSearch}
        handleClearFilters={handleClearFilters}
        offset={offset}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        visibleFields={visibleFields}
        toggleField={(field) =>
          setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }))
        }
      />

      {error && <div className="rem-error">{error}</div>}

      <ResultsTable
        results={results}
        loading={loading}
        visibleFields={visibleFields}
        visibleColCount={visibleColCount}
        activeFeedbackRecordId={activeFeedbackRecordId}
        setActiveFeedbackRecordId={setActiveFeedbackRecordId}
        feedbackEmployeeId={feedbackEmployeeId}
        setFeedbackEmployeeId={setFeedbackEmployeeId}
        feedbackYear={feedbackYear}
        setFeedbackYear={setFeedbackYear}
        feedbackRating={feedbackRating}
        setFeedbackRating={setFeedbackRating}
        feedbackComment={feedbackComment}
        setFeedbackComment={setFeedbackComment}
        feedbackMessage={feedbackMessage}
        setFeedbackMessage={setFeedbackMessage}
        handleSubmitFeedback={handleSubmitFeedback}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        handleSort={handleSort}
        lastFeedbackId={lastFeedbackId}
        lastFeedbackRating={lastFeedbackRating}
        setLastFeedbackRating={setLastFeedbackRating}
        lastFeedbackComment={lastFeedbackComment}
        setLastFeedbackComment={setLastFeedbackComment}
        handleUpdateLastFeedback={handleUpdateLastFeedback}
      />
    </div>
  );
};

export default RemunerationExplorer;
