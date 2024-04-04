var express = require('express');
var router = express.Router();
const Job = require('../models/job');
const { scheduleJobs } = require('../scheduler');
const { upload } = require("../multer")

router.get('/', async function (req, res, next) {
  const jobs = await Job.find();
  res.render('index', { jobs });
});

router.post('/upload', upload.array('videos'), async (req, res) => {
  const files = req.files; 

  const jobs = files.map(file => ({
    filename: file.filename,
    status: 'Pending'
  }));

  try {
    await Job.insertMany(jobs); 
    scheduleJobs();
    res.redirect('/');
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/status/:jobId', async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  res.json({ status: job.status });
});

module.exports = router;
