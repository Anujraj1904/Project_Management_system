// routes/index.js directory to handle routes.
const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.render("pages/index", { layout: 'layouts/boilerplate', projects });
});

router.post("/projects", async (req, res) => {
  if(!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const { title, description, assignedTo, status } = req.body;
  const newProject = new Project({ title, description, assignedTo, status });
  await newProject.save();
  res.redirect("/");
});
router.put("/projects/:id", async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

module.exports = router;
