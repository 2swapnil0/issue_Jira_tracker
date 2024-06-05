import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

const JIRA_BASE_URL = process.env.JIRA_BASE_URL || 'https://swapnilmhatre.atlassian.net';
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN || 'ATATT3xFfGF04iBGDA1mZgqqN1WPm_3BCu83KsN2nCjOdNGa5Pf2aAESeZPd4zr-WaNbTAnlO9nNq5buTRr2pi-r6ehy2EXRlZ7pRVzyB_x9ngnU0fyJOzGpZwYCImcFDWi5oxudayMu8LBWYsH2LjPPW7OB87PDdYTL0nNU5GzSWOezlvx-fhM=2094F9BB';
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'KAN';

const headers = {
  'Authorization': `Basic ${Buffer.from(`swapnilmhatre671@gmail.com:${JIRA_API_TOKEN}`).toString('base64')}`,
  'Accept': 'application/json'
};

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/issues', async (req, res) => {
  try {
    const url = `${JIRA_BASE_URL}/rest/api/3/search?jql=project=${JIRA_PROJECT_KEY}`;
    console.log('Fetching issues from URL:', url);
    const response = await axios.get(url, { headers });
    const issues = response.data.issues.map(issue => ({
      key: issue.key,
      summary: issue.fields.summary,
      issueType: issue.fields.issuetype.name,
      status: issue.fields.status.name,
      assignee: issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'
    }));
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
