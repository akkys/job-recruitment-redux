const router = require("express").Router();
const Projects = require("../models/ProjectModel");
const jwtAuth = require("../util");

router.post("/add", jwtAuth.isAuth, async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      cmpName,
      fromDate,
      toDate,
      role,
      contribution,
      technologies,
    } = req.body;

    if (
      !title ||
      !summary ||
      !description ||
      !cmpName ||
      !fromDate ||
      !toDate ||
      !role ||
      !contribution ||
      !technologies
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const newProject = new Projects({
      title,
      summary,
      description,
      cmpName,
      fromDate,
      toDate,
      role,
      contribution,
      technologies,
      userId: req.user,
    });

    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update/:id", jwtAuth.isAuth, async (req, res) => {
  try {
    const projectData = await Projects.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });

    if (projectData) {
      projectData.title = req.body.title;
      projectData.summary = req.body.summary;
      projectData.description = req.body.description;
      projectData.cmpName = req.body.cmpName;
      projectData.fromDate = req.body.fromDate;
      projectData.toDate = req.body.toDate;
      projectData.contribution = req.body.contribution;
      projectData.technologies = req.body.technologies;
    }

    const updatedProject = await projectData.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", jwtAuth.isAuth, async (req, res) => {
  const projectData = await Projects.find({ userId: req.user });
  res.json(projectData);
});

router.get("/:id", jwtAuth.isAuth, async (req, res) => {
  const projectData = await Projects.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(projectData);
});

router.delete("/:id", jwtAuth.isAuth, async (req, res) => {
  const projectData = await Projects.findOne({
    userId: res.user,
    _id: req.params.id,
  });
  // if (!jobList)
  //   res.status(400).json({ msg: "No Todo found with this userId." });
  const deletedProject = await Projects.findByIdAndDelete(req.params.id);
  res.json(deletedProject);
});

module.exports = router;
