import React from 'react';
import './css/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleFetchData = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home">
      <div className="containerh">
        <section>
          <h2>React Developer Assignment: Connect to Jira and List Issues</h2>
          <p>
            Create a React application that connects to Jira's REST API and lists all issues for a specific project.
            The application should display the issues in a user-friendly manner and include relevant details for each issue.
          </p>
          <button onClick={handleFetchData}>Fetch Data</button>
        </section>
      </div>
    </div>
  );
};

export default Home;
