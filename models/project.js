// models/project.js directory to define your Project schema.

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: String,
    status: String
});

module.exports = mongoose.model('Project', projectSchema);
