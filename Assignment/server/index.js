import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT

const JIRA_BASE_URL = process.env.JIRA_BASE_URL
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN
const JIRA_PROJECT_KEY =process.env.JIRA_PROJECT_KEY

if (!JIRA_BASE_URL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
  throw new Error('Missing required environment variables');
}

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
    const url = `https://swapnilmhatre.atlassian.net/rest/api/3/search?jql=project=KAN`;
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
