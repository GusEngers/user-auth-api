const { Router } = require('express');
const generateApiKey = require('../controllers/api_key/generate_api_key');
const getProjects = require('../controllers/api_key/get_projects');
const getKey = require('../controllers/api_key/get_key');

const router = Router();

router.post('/generate', async (req, res) => {
  const { email, project } = req.body;
  try {
    const key = await generateApiKey(email, project);
    res.status(201).json({ key });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/projects', async (req, res) => {
  const { email } = req.body;
  try {
    const projects = await getProjects(email);
    res.json({ count: projects.length, projects });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/key', async (req, res) => {
  const { email, project } = req.body;
  try {
    const key = await getKey(email, project);
    res.json({ key });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
