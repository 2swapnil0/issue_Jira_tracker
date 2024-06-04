import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors'; // Import the cors middleware

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/",(req,res)=>{
  res.send(Server is running."")
})
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(5000,console.log(`Server is running on port 5000`));

const { JIRA_BASE_URL, JIRA_API_TOKEN, JIRA_PROJECT_KEY } = process.env;

const headers = {
  'Authorization': `Basic ${Buffer.from(`swapnilmhatre671@gmail.com:${JIRA_API_TOKEN}`).toString('base64')}`,
  'Accept': 'application/json'
};

app.use(cors()); // Enable CORS for all routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search?jql=project=${JIRA_PROJECT_KEY}`, { headers });
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
