const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    filename: String,
    status: String
});

module.exports = mongoose.model('Job', jobSchema);
