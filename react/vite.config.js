import "./vite.config.css";
import {jsx as $1L9d8$jsx, jsxs as $1L9d8$jsxs, Fragment as $1L9d8$Fragment} from "react/jsx-runtime";
import $1L9d8$react, {useState as $1L9d8$useState, useEffect as $1L9d8$useEffect} from "react";
import $1L9d8$reactdomclient from "react-dom/client";








const $313a4442c828dc70$var$Filters = ({ employees: employees, departments: departments, titles: titles, selectedEmployeeId: selectedEmployeeId, setSelectedEmployeeId: setSelectedEmployeeId, selectedDepartmentId: selectedDepartmentId, setSelectedDepartmentId: setSelectedDepartmentId, selectedTitleId: selectedTitleId, setSelectedTitleId: setSelectedTitleId, year: year, setYear: setYear, limit: limit, setLimit: setLimit, loading: loading, handleSearch: handleSearch, handleClearFilters: handleClearFilters, offset: offset, handlePrevPage: handlePrevPage, handleNextPage: handleNextPage, visibleFields: visibleFields, toggleField: toggleField })=>{
    return /*#__PURE__*/ (0, $1L9d8$jsxs)((0, $1L9d8$Fragment), {
        children: [
            /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                className: "rem-filters-grid",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                children: "Employee"
                            }),
                            /*#__PURE__*/ (0, $1L9d8$jsxs)("select", {
                                value: selectedEmployeeId,
                                onChange: (e)=>setSelectedEmployeeId(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                        value: "",
                                        children: "All employees"
                                    }),
                                    employees.map((employee)=>/*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                            value: employee.employee_id,
                                            children: employee.name
                                        }, employee.employee_id))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                children: "Department"
                            }),
                            /*#__PURE__*/ (0, $1L9d8$jsxs)("select", {
                                value: selectedDepartmentId,
                                onChange: (e)=>setSelectedDepartmentId(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                        value: "",
                                        children: "All departments"
                                    }),
                                    departments.map((department)=>/*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                            value: department.department_id,
                                            children: department.department_name
                                        }, department.department_id))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                children: "Title"
                            }),
                            /*#__PURE__*/ (0, $1L9d8$jsxs)("select", {
                                value: selectedTitleId,
                                onChange: (e)=>setSelectedTitleId(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                        value: "",
                                        children: "All titles"
                                    }),
                                    titles.map((title)=>/*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                            value: title.title_id,
                                            children: title.title_name
                                        }, title.title_id))
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                children: "Year"
                            }),
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "number",
                                value: year,
                                onChange: (e)=>setYear(e.target.value),
                                placeholder: "e.g. 2023"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                children: "Limit"
                            }),
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "number",
                                value: limit,
                                min: 1,
                                onChange: (e)=>setLimit(Number(e.target.value) || 1)
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                className: "rem-filters-group",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                        onClick: handleSearch,
                        disabled: loading,
                        children: loading ? "Loading..." : "Search"
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                        onClick: handleClearFilters,
                        style: {
                            marginLeft: "0.5rem"
                        },
                        children: "Clear filters"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                className: "rem-pagination",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                        onClick: handlePrevPage,
                        disabled: offset === 0 || loading,
                        children: "Previous"
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("span", {
                        style: {
                            margin: "0 0.5rem"
                        },
                        children: [
                            "Offset: ",
                            offset,
                            " | Limit: ",
                            limit
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                        onClick: handleNextPage,
                        disabled: loading,
                        children: "Next"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                className: "rem-visible-fields",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsx)("span", {
                        style: {
                            marginRight: "0.5rem"
                        },
                        children: "Visible fields:"
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.employee,
                                onChange: ()=>toggleField("employee")
                            }),
                            "Employee"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.department,
                                onChange: ()=>toggleField("department")
                            }),
                            "Department"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.title,
                                onChange: ()=>toggleField("title")
                            }),
                            "Title"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.year,
                                onChange: ()=>toggleField("year")
                            }),
                            "Year"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.remuneration,
                                onChange: ()=>toggleField("remuneration")
                            }),
                            "Remuneration"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.expenses,
                                onChange: ()=>toggleField("expenses")
                            }),
                            "Expenses"
                        ]
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $1L9d8$jsx)("input", {
                                type: "checkbox",
                                checked: visibleFields.feedback,
                                onChange: ()=>toggleField("feedback")
                            }),
                            "Feedback"
                        ]
                    })
                ]
            })
        ]
    });
};
var $313a4442c828dc70$export$2e2bcd8739ae039 = $313a4442c828dc70$var$Filters;




const $0ea02760ccc8f6b7$var$ResultsTable = ({ results: results, loading: loading, visibleFields: visibleFields, visibleColCount: visibleColCount, activeFeedbackRecordId: activeFeedbackRecordId, setActiveFeedbackRecordId: setActiveFeedbackRecordId, feedbackEmployeeId: feedbackEmployeeId, setFeedbackEmployeeId: setFeedbackEmployeeId, feedbackYear: feedbackYear, setFeedbackYear: setFeedbackYear, feedbackRating: feedbackRating, setFeedbackRating: setFeedbackRating, feedbackComment: feedbackComment, setFeedbackComment: setFeedbackComment, feedbackMessage: feedbackMessage, setFeedbackMessage: setFeedbackMessage, handleSubmitFeedback: handleSubmitFeedback, sortColumn: sortColumn, sortDirection: sortDirection, handleSort: handleSort })=>{
    const renderSortIndicator = (column)=>{
        if (sortColumn !== column) return null;
        return sortDirection === "asc" ? " \u25B2" : " \u25BC";
    };
    return /*#__PURE__*/ (0, $1L9d8$jsxs)((0, $1L9d8$Fragment), {
        children: [
            /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                className: "rem-table-header",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsx)("div", {
                        className: "rem-table-title",
                        children: "Remuneration results"
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                        className: "rem-table-subtitle",
                        children: [
                            results.length,
                            " record",
                            results.length === 1 ? "" : "s",
                            " shown"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $1L9d8$jsxs)("table", {
                className: "rem-classic-table",
                children: [
                    /*#__PURE__*/ (0, $1L9d8$jsx)("thead", {
                        children: /*#__PURE__*/ (0, $1L9d8$jsxs)("tr", {
                            children: [
                                visibleFields.employee && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("employee_name"),
                                    children: [
                                        "Employee",
                                        renderSortIndicator("employee_name")
                                    ]
                                }),
                                visibleFields.department && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("department_name"),
                                    children: [
                                        "Department",
                                        renderSortIndicator("department_name")
                                    ]
                                }),
                                visibleFields.title && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("title_name"),
                                    children: [
                                        "Title",
                                        renderSortIndicator("title_name")
                                    ]
                                }),
                                visibleFields.year && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("year"),
                                    children: [
                                        "Year",
                                        renderSortIndicator("year")
                                    ]
                                }),
                                visibleFields.remuneration && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("remuneration"),
                                    children: [
                                        "Remuneration",
                                        renderSortIndicator("remuneration")
                                    ]
                                }),
                                visibleFields.expenses && /*#__PURE__*/ (0, $1L9d8$jsxs)("th", {
                                    onClick: ()=>handleSort("expenses"),
                                    children: [
                                        "Expenses",
                                        renderSortIndicator("expenses")
                                    ]
                                }),
                                visibleFields.feedback && /*#__PURE__*/ (0, $1L9d8$jsx)("th", {
                                    children: "Feedback"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, $1L9d8$jsxs)("tbody", {
                        children: [
                            results.map((row)=>/*#__PURE__*/ (0, $1L9d8$jsxs)((0, $1L9d8$react).Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0, $1L9d8$jsxs)("tr", {
                                            children: [
                                                visibleFields.employee && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.employee_name || row.name
                                                }),
                                                visibleFields.department && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.department_name
                                                }),
                                                visibleFields.title && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.title_name
                                                }),
                                                visibleFields.year && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.year
                                                }),
                                                visibleFields.remuneration && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.remuneration
                                                }),
                                                visibleFields.expenses && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: row.expenses
                                                }),
                                                visibleFields.feedback && /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                    children: /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>{
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
                                                        },
                                                        children: activeFeedbackRecordId === row.record_id ? "Close" : "Feedback"
                                                    })
                                                })
                                            ]
                                        }),
                                        activeFeedbackRecordId === row.record_id && visibleFields.feedback && /*#__PURE__*/ (0, $1L9d8$jsx)("tr", {
                                            children: /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                                colSpan: visibleColCount,
                                                children: /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                    className: "rem-feedback-block",
                                                    children: [
                                                        /*#__PURE__*/ (0, $1L9d8$jsxs)("strong", {
                                                            children: [
                                                                "Feedback for ",
                                                                row.employee_name || row.name,
                                                                " (",
                                                                row.year,
                                                                ")"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                            className: "rem-feedback-summary",
                                                            children: [
                                                                /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                                    children: [
                                                                        "Total: ",
                                                                        row.total_feedback_count ?? 0
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                                    children: [
                                                                        "High: ",
                                                                        row.high_rating_count ?? 0,
                                                                        " | Acceptable:",
                                                                        " ",
                                                                        row.acceptable_rating_count ?? 0,
                                                                        " | Low:",
                                                                        " ",
                                                                        row.low_rating_count ?? 0
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, $1L9d8$jsxs)("form", {
                                                            onSubmit: handleSubmitFeedback,
                                                            className: "rem-feedback-form",
                                                            children: [
                                                                /*#__PURE__*/ (0, $1L9d8$jsx)("div", {
                                                                    children: "New feedback"
                                                                }),
                                                                /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                                                            children: "Rating"
                                                                        }),
                                                                        /*#__PURE__*/ (0, $1L9d8$jsxs)("select", {
                                                                            value: feedbackRating,
                                                                            onChange: (e)=>setFeedbackRating(e.target.value),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                                                                    value: "High",
                                                                                    children: "High"
                                                                                }),
                                                                                /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                                                                    value: "Acceptable",
                                                                                    children: "Acceptable"
                                                                                }),
                                                                                /*#__PURE__*/ (0, $1L9d8$jsx)("option", {
                                                                                    value: "Low",
                                                                                    children: "Low"
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $1L9d8$jsx)("label", {
                                                                            children: "Comment"
                                                                        }),
                                                                        /*#__PURE__*/ (0, $1L9d8$jsx)("textarea", {
                                                                            value: feedbackComment,
                                                                            onChange: (e)=>setFeedbackComment(e.target.value)
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0, $1L9d8$jsx)("button", {
                                                                    type: "submit",
                                                                    disabled: !feedbackEmployeeId || !feedbackYear,
                                                                    children: "Save new feedback"
                                                                })
                                                            ]
                                                        }),
                                                        feedbackMessage && /*#__PURE__*/ (0, $1L9d8$jsx)("span", {
                                                            className: "rem-feedback-message",
                                                            children: feedbackMessage
                                                        })
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                }, row.record_id)),
                            !loading && results.length === 0 && /*#__PURE__*/ (0, $1L9d8$jsx)("tr", {
                                children: /*#__PURE__*/ (0, $1L9d8$jsx)("td", {
                                    colSpan: visibleColCount,
                                    style: {
                                        textAlign: "center"
                                    },
                                    children: "No records found"
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
var $0ea02760ccc8f6b7$export$2e2bcd8739ae039 = $0ea02760ccc8f6b7$var$ResultsTable;



const $6f617c3c2f6c7350$var$API_BASE_URL = "http://localhost:3000/v1";
const $6f617c3c2f6c7350$var$RemunerationExplorer = ()=>{
    const [employees, setEmployees] = (0, $1L9d8$useState)([]);
    const [departments, setDepartments] = (0, $1L9d8$useState)([]);
    const [titles, setTitles] = (0, $1L9d8$useState)([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = (0, $1L9d8$useState)("");
    const [selectedDepartmentId, setSelectedDepartmentId] = (0, $1L9d8$useState)("");
    const [selectedTitleId, setSelectedTitleId] = (0, $1L9d8$useState)("");
    const [year, setYear] = (0, $1L9d8$useState)("");
    const [limit, setLimit] = (0, $1L9d8$useState)(50);
    const [offset, setOffset] = (0, $1L9d8$useState)(0);
    const [results, setResults] = (0, $1L9d8$useState)([]);
    const [loading, setLoading] = (0, $1L9d8$useState)(false);
    const [error, setError] = (0, $1L9d8$useState)("");
    const [visibleFields, setVisibleFields] = (0, $1L9d8$useState)({
        employee: true,
        department: true,
        title: true,
        year: true,
        remuneration: true,
        expenses: true,
        feedback: true
    });
    const [activeFeedbackRecordId, setActiveFeedbackRecordId] = (0, $1L9d8$useState)(null);
    const [feedbackEmployeeId, setFeedbackEmployeeId] = (0, $1L9d8$useState)("");
    const [feedbackYear, setFeedbackYear] = (0, $1L9d8$useState)("");
    const [feedbackRating, setFeedbackRating] = (0, $1L9d8$useState)("High");
    const [feedbackComment, setFeedbackComment] = (0, $1L9d8$useState)("");
    const [feedbackMessage, setFeedbackMessage] = (0, $1L9d8$useState)("");
    const [feedbackJustSaved, setFeedbackJustSaved] = (0, $1L9d8$useState)(false);
    const [sortColumn, setSortColumn] = (0, $1L9d8$useState)("");
    const [sortDirection, setSortDirection] = (0, $1L9d8$useState)("asc");
    (0, $1L9d8$useEffect)(()=>{
        loadEmployees();
        loadDepartments();
        loadTitles();
    }, []);
    const loadEmployees = async ()=>{
        try {
            const response = await fetch(`${$6f617c3c2f6c7350$var$API_BASE_URL}/employees/all?limit=10000&offset=0`);
            const data = await response.json();
            setEmployees(data);
        } catch (err) {
            console.error(err);
        }
    };
    const loadDepartments = async ()=>{
        try {
            const response = await fetch(`${$6f617c3c2f6c7350$var$API_BASE_URL}/departments/all?limit=10000&offset=0`);
            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            console.error(err);
        }
    };
    const loadTitles = async ()=>{
        try {
            const response = await fetch(`${$6f617c3c2f6c7350$var$API_BASE_URL}/titles/all?limit=100000&offset=0`);
            const data = await response.json();
            setTitles(data);
        } catch (err) {
            console.error(err);
        }
    };
    const buildSearchUrl = ()=>{
        const url = new URL(`${$6f617c3c2f6c7350$var$API_BASE_URL}/remuneration/with-feedback/search`);
        if (selectedEmployeeId) url.searchParams.set("employeeId", selectedEmployeeId);
        if (selectedDepartmentId) url.searchParams.set("departmentId", selectedDepartmentId);
        if (selectedTitleId) url.searchParams.set("titleId", selectedTitleId);
        if (year) url.searchParams.set("year", year);
        if (limit) url.searchParams.set("limit", limit);
        if (offset) url.searchParams.set("offset", offset);
        return url.toString();
    };
    const handleSearch = async ()=>{
        setLoading(true);
        setError("");
        try {
            const url = buildSearchUrl();
            const response = await fetch(url);
            if (!response.ok) {
                const errBody = await response.json().catch(()=>({}));
                throw new Error(errBody.error || "Failed to fetch data");
            }
            const data = await response.json();
            let resArray = Array.isArray(data) ? data : [
                data
            ];
            if (sortColumn) resArray.sort((a, b)=>{
                const valA = a[sortColumn];
                const valB = b[sortColumn];
                if (typeof valA === "number" && typeof valB === "number") return sortDirection === "asc" ? valA - valB : valB - valA;
                const strA = (valA || "").toString().toLowerCase();
                const strB = (valB || "").toString().toLowerCase();
                if (strA < strB) return sortDirection === "asc" ? -1 : 1;
                if (strA > strB) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
            setResults(resArray);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setResults([]);
        } finally{
            setLoading(false);
        }
    };
    const handleClearFilters = ()=>{
        setSelectedEmployeeId("");
        setSelectedDepartmentId("");
        setSelectedTitleId("");
        setYear("");
        setOffset(0);
    };
    const handleSubmitFeedback = async (e)=>{
        e.preventDefault();
        setFeedbackMessage("");
        try {
            const response = await fetch(`${$6f617c3c2f6c7350$var$API_BASE_URL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: Number(feedbackEmployeeId),
                    year: Number(feedbackYear),
                    rating: feedbackRating,
                    comment: feedbackComment
                })
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.error || "Failed to submit feedback");
            setFeedbackMessage("Feedback submitted.");
            setFeedbackComment("");
            setFeedbackJustSaved(true);
        } catch (err) {
            setFeedbackMessage(err.message);
        }
    };
    (0, $1L9d8$useEffect)(()=>{
        if (feedbackJustSaved && activeFeedbackRecordId && feedbackEmployeeId && feedbackYear) {
            handleSearch();
            setFeedbackJustSaved(false);
        }
    }, [
        feedbackJustSaved,
        activeFeedbackRecordId,
        feedbackEmployeeId,
        feedbackYear
    ]);
    const handlePrevPage = ()=>{
        setOffset((prev)=>Math.max(prev - limit, 0));
    };
    const handleNextPage = ()=>{
        setOffset((prev)=>prev + limit);
    };
    (0, $1L9d8$useEffect)(()=>{
        handleSearch();
    }, [
        offset,
        limit,
        sortColumn,
        sortDirection
    ]);
    const visibleColCount = Object.values(visibleFields).filter((v)=>v).length || 1;
    const handleSort = (column)=>{
        if (sortColumn === column) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };
    return /*#__PURE__*/ (0, $1L9d8$jsxs)("div", {
        className: "rem-container",
        children: [
            /*#__PURE__*/ (0, $1L9d8$jsx)("h1", {
                children: "Vancouver Remuneration Explorer"
            }),
            /*#__PURE__*/ (0, $1L9d8$jsx)((0, $313a4442c828dc70$export$2e2bcd8739ae039), {
                employees: employees,
                departments: departments,
                titles: titles,
                selectedEmployeeId: selectedEmployeeId,
                setSelectedEmployeeId: setSelectedEmployeeId,
                selectedDepartmentId: selectedDepartmentId,
                setSelectedDepartmentId: setSelectedDepartmentId,
                selectedTitleId: selectedTitleId,
                setSelectedTitleId: setSelectedTitleId,
                year: year,
                setYear: setYear,
                limit: limit,
                setLimit: setLimit,
                loading: loading,
                handleSearch: handleSearch,
                handleClearFilters: handleClearFilters,
                offset: offset,
                handlePrevPage: handlePrevPage,
                handleNextPage: handleNextPage,
                visibleFields: visibleFields,
                toggleField: (field)=>setVisibleFields((prev)=>({
                            ...prev,
                            [field]: !prev[field]
                        }))
            }),
            error && /*#__PURE__*/ (0, $1L9d8$jsx)("div", {
                className: "rem-error",
                children: error
            }),
            /*#__PURE__*/ (0, $1L9d8$jsx)((0, $0ea02760ccc8f6b7$export$2e2bcd8739ae039), {
                results: results,
                loading: loading,
                visibleFields: visibleFields,
                visibleColCount: visibleColCount,
                activeFeedbackRecordId: activeFeedbackRecordId,
                setActiveFeedbackRecordId: setActiveFeedbackRecordId,
                feedbackEmployeeId: feedbackEmployeeId,
                setFeedbackEmployeeId: setFeedbackEmployeeId,
                feedbackYear: feedbackYear,
                setFeedbackYear: setFeedbackYear,
                feedbackRating: feedbackRating,
                setFeedbackRating: setFeedbackRating,
                feedbackComment: feedbackComment,
                setFeedbackComment: setFeedbackComment,
                feedbackMessage: feedbackMessage,
                setFeedbackMessage: setFeedbackMessage,
                handleSubmitFeedback: handleSubmitFeedback,
                sortColumn: sortColumn,
                sortDirection: sortDirection,
                handleSort: handleSort
            })
        ]
    });
};
var $6f617c3c2f6c7350$export$2e2bcd8739ae039 = $6f617c3c2f6c7350$var$RemunerationExplorer;


(0, $1L9d8$reactdomclient).createRoot(document.getElementById("root")).render(/*#__PURE__*/ (0, $1L9d8$jsx)((0, $1L9d8$react).StrictMode, {
    children: /*#__PURE__*/ (0, $1L9d8$jsx)((0, $6f617c3c2f6c7350$export$2e2bcd8739ae039), {})
}));


//# sourceMappingURL=vite.config.js.map
