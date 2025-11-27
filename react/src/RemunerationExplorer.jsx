import React, { useEffect, useState } from "react";
import Filters from "./Filters.jsx";
import ResultsTable from "./ResultsTable.jsx";
import "./RemunerationExplorer.css";

const API_BASE_URL =
  "https://crispy-capybara-4j5jj657prj5f7qp7-3000.app.github.dev/v1";

const RemunerationExplorer = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [titles, setTitles] = useState([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(50);
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
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);
  const [editingRating, setEditingRating] = useState("High");
  const [editingComment, setEditingComment] = useState("");

  useEffect(() => {
    loadEmployees();
    loadDepartments();
    loadTitles();
  }, []);

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
    const url = new URL(`${API_BASE_URL}/remuneration/search`);
    if (selectedEmployeeId) url.searchParams.set("employeeId", selectedEmployeeId);
    if (selectedDepartmentId) url.searchParams.set("departmentId", selectedDepartmentId);
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
      console.log("##########search URl", url);
      const response = await fetch(url);
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to fetch data");
      }
      const data = await response.json();
      setResults(Array.isArray(data) ? data : [data]);
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

  const loadFeedbackForRow = async (employeeId, yearValue) => {
    try {
      const url = new URL(`${API_BASE_URL}/feedback`);
      url.searchParams.set("employeeId", employeeId);
      url.searchParams.set("year", yearValue);
      const response = await fetch(url.toString());
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to load feedback");
      }
      const data = await response.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.feedback)
        ? data.feedback
        : [];
      setFeedbackList(list);
    } catch (err) {
      console.error(err);
      setFeedbackList([]);
    }
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
      await loadFeedbackForRow(feedbackEmployeeId, feedbackYear);
    } catch (err) {
      setFeedbackMessage(err.message);
    }
  };

  const handleUpdateFeedback = async (e) => {
    e.preventDefault();
    if (!editingFeedbackId) return;
    setFeedbackMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/feedback/${editingFeedbackId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating: editingRating,
            comment: editingComment,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update feedback");
      }
      setFeedbackMessage("Feedback updated.");
      await loadFeedbackForRow(feedbackEmployeeId, feedbackYear);
      setEditingFeedbackId(null);
    } catch (err) {
      setFeedbackMessage(err.message);
    }
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    handleSearch();
  }, [offset, limit]);

  const visibleColCount =
    Object.values(visibleFields).filter((v) => v).length || 1;

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
        feedbackList={feedbackList}
        loadFeedbackForRow={loadFeedbackForRow}
        handleSubmitFeedback={handleSubmitFeedback}
        editingFeedbackId={editingFeedbackId}
        setEditingFeedbackId={setEditingFeedbackId}
        editingRating={editingRating}
        setEditingRating={setEditingRating}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
        handleUpdateFeedback={handleUpdateFeedback}
      />
    </div>
  );
};

export default RemunerationExplorer;
