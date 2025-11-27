import React from "react";

const Filters = ({
  employees,
  departments,
  titles,
  selectedEmployeeId,
  setSelectedEmployeeId,
  selectedDepartmentId,
  setSelectedDepartmentId,
  selectedTitleId,
  setSelectedTitleId,
  year,
  setYear,
  limit,
  setLimit,
  loading,
  handleSearch,
  handleClearFilters,
  offset,
  handlePrevPage,
  handleNextPage,
  visibleFields,
  toggleField,
}) => {
  return (
    <>
      <div className="rem-filters-grid">
        <div>
          <label>Employee</label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          >
            <option value="">All employees</option>
            {employees.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Department</label>
          <select
            value={selectedDepartmentId}
            onChange={(e) => setSelectedDepartmentId(e.target.value)}
          >
            <option value="">All departments</option>
            {departments.map((department) => (
              <option
                key={department.department_id}
                value={department.department_id}
              >
                {department.department_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Title</label>
          <select
            value={selectedTitleId}
            onChange={(e) => setSelectedTitleId(e.target.value)}
          >
            <option value="">All titles</option>
            {titles.map((title) => (
              <option key={title.title_id} value={title.title_id}>
                {title.title_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2023"
          />
        </div>

        <div>
          <label>Limit</label>
          <input
            type="number"
            value={limit}
            min={1}
            onChange={(e) => setLimit(Number(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className="rem-filters-group">
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
        <button onClick={handleClearFilters} style={{ marginLeft: "0.5rem" }}>
          Clear filters
        </button>
      </div>

      <div className="rem-pagination">
        <button onClick={handlePrevPage} disabled={offset === 0 || loading}>
          Previous
        </button>
        <span style={{ margin: "0 0.5rem" }}>
          Offset: {offset} | Limit: {limit}
        </span>
        <button onClick={handleNextPage} disabled={loading}>
          Next
        </button>
      </div>

      <div className="rem-visible-fields">
        <span style={{ marginRight: "0.5rem" }}>Visible fields:</span>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.employee}
            onChange={() => toggleField("employee")}
          />
          Employee
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.department}
            onChange={() => toggleField("department")}
          />
          Department
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.title}
            onChange={() => toggleField("title")}
          />
          Title
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.year}
            onChange={() => toggleField("year")}
          />
          Year
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.remuneration}
            onChange={() => toggleField("remuneration")}
          />
          Remuneration
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.expenses}
            onChange={() => toggleField("expenses")}
          />
          Expenses
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleFields.feedback}
            onChange={() => toggleField("feedback")}
          />
          Feedback
        </label>
      </div>
    </>
  );
};

export default Filters;
