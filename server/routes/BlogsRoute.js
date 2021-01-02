const router = require("express").Router();
let Blog = require("../models/BlogsModel");
const jwtAuth = require("../util");

router.post("/add", jwtAuth.isAuth, async (req, res) => {
  try {
    const { name, title, description, companyName } = req.body;

    if (!name || !title || !description || !companyName)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newBlog = new Blog({
      name,
      title,
      description,
      companyName,
      userId: req.user,
    });

    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/update/:id", jwtAuth.isAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (blogData) {
      blogData.name = req.body.name;
      blogData.title = req.body.title;
      blogData.description = req.body.description;
      blogData.companyName = req.body.companyName;
    }

    const updatedBlog = await blogData.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", jwtAuth.isAuth, async (req, res) => {
  const blogData = await Blog.find({ userId: req.user });
  res.json(blogData);
});

router.get("/all", async (req, res) => {
  const blogData = await Blog.find();
  res.json(blogData);
});

router.get("/:id", jwtAuth.isAuth, async (req, res) => {
  const blogData = await Blog.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(blogData);
});

router.delete("/:id", jwtAuth.isAuth, async (req, res) => {
  const blogData = await Team.findOne({
    userId: res.user,
    _id: req.params.id,
  });

  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.json(deletedBlog);
});

module.exports = router;
