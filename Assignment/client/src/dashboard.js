import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/dashboard.css';

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(10);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/issues');
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching issues. Please try again later.');
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Apply filters
  let filteredIssues = [...issues];
  if (filterType) {
    filteredIssues = filteredIssues.filter(issue => issue.issueType === filterType);
  }
  if (filterStatus) {
    filteredIssues = filteredIssues.filter(issue => issue.status === filterStatus);
  }
  if (filterAssignee) {
    filteredIssues = filteredIssues.filter(issue => issue.assignee === filterAssignee);
  }

  // Logic for pagination based on filtered issues
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredIssues.length / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Logic for displaying current issues after applying filters
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  // Handle page click
  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilterButtonClick = () => {
    setShowFilterModal(true);
  };

  const handleFilterModalClose = () => {
    setShowFilterModal(false);
  };

  const handleFilterSubmit = () => {
    // Apply filters
    // Fetch filtered issues again if needed
    setShowFilterModal(false);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="lds-default">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className='mainheading'>Issues List</h2>
      <button1 onClick={handleFilterButtonClick}><span class="material-symbols-outlined">filter_list</span></button1>
      {showFilterModal && (
        <div className="filter-modal">
          <div className="filter-content">
            <span className="close" onClick={handleFilterModalClose}>&times;</span>
            <h3>Filter Issues</h3>
            <form onSubmit={handleFilterSubmit}>
              <div className="form-group">
                <label>Issue Type:</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Epic">Epic</option>
                  <option value="Bug">Bug</option>
                  <option value="Story">Story</option>
                  <option value="Task">Task</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Select</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assignee:</label>
                <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Unassigned">Unassigned</option>
                  <option value="Swapnil Mhatre">Swapnil Mhatre</option>
                  <option value="swapnilmhatre212">swapnilmhatre212</option>
                </select>
              </div>
              <button type="submit">Apply Filters</button>
            </form>
          </div>
        </div>
      )}
      <table className="content-table">
        <thead>
          <tr>
            <th>Issue Key</th>
            <th>Summary</th>
            <th>Issue Type</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {currentIssues.map(issue => (
            <tr key={issue.key}>
              <td>{issue.key}</td>
              <td>{issue.summary}</td>
              <td>{issue.issueType}</td>
              <td>{issue.status}</td>
              <td>{issue.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span onClick={handlePrevClick}>&laquo;</span>
        {pageNumbers.map(number => (
          <span key={number} onClick={() => handleClick(number)}>{number}</span>
        ))}
        <span onClick={handleNextClick}>&raquo;</span>
      </div>
    </div>
  );
};

export default IssuesList;
