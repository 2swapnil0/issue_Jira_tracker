import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 8000;

const JIRA_BASE_URL='https://swapnilmhatre.atlassian.net/'
const JIRA_API_TOKEN='ATATT3xFfGF0urGDkkqWbjuuIHlLuVxxcc_S_NS9DILFSa9aj94QuYdbpAGqNWz_TuoeYx59knlCoibZR5gEz3bXLgnh2_iIgHYakcei3MAJ86ZFOmPX7kVzFhCosvu9s2wjIQfavDCDLRQLVrJGQsaL1EZ2mryP_InZjaj5oDDacSSUX0VF_0A=972A81F5'
const JIRA_PROJECT_KEY='KAN'


const headers = {
  'Authorization': `Basic ${Buffer.from(`swapnilmhatre671@gmail.com:${JIRA_API_TOKEN}`).toString('base64')}`,
  'Accept': 'application/json'
};

app.use(cors());

app.get('/issues', async (req, res) => {
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




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Export app for Vercel
