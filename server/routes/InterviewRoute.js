const router = require("express").Router();
const jwtAuth = require("../util");
let Interview = require("../models/InterviewModel");

// router.route("/").get(auth, (req, res) => {
//   Interview.find({ userId: req.user })
//     .then((schedule) => res.json(schedule))
//     .catch((err) => console.log(err));
// });

router.get("/", jwtAuth.isAuth, async (req, res) => {
  const interviewData = await Interview.find({ userId: req.user });
  res.json(interviewData);
});

router.post("/add", jwtAuth.isAuth, async (req, res) => {
  try {
    const { name, email, date, interviewer, inttype, status } = req.body;

    if (!name || !interviewer || !email || !date || !inttype || !status)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const newInterview = new Interview({
      name,
      email,
      date,
      interviewer,
      inttype,
      status,
      userId: req.user,
    });

    const savedInterview = await newInterview.save();
    res.json(savedInterview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", jwtAuth.isAuth, async (req, res) => {
  const interviewData = await Interview.findById({
    userId: req.user,
    _id: req.params.id,
  });
  res.json(interviewData);
});

router.post("/update/:id", jwtAuth.isAuth, async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate({
      userId: req.user,
      _id: req.params.id,
    });
    if (interview) {
      (interview.name = req.body.name),
        (interview.date = Date.parse(req.body.date)),
        (interview.email = req.body.email),
        (interview.interviewer = req.body.interviewer),
        (interview.inttype = req.body.inttype);
      interview.status = req.body.status;
    }

    const updatedInterview = await interview.save();
    res.json(updatedInterview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", jwtAuth.isAuth, async (req, res) => {
  const interviewData = await Interview.findOne({
    userId: res.user,
    _id: req.params.id,
  });

  const deletedInterview = await Interview.findByIdAndDelete(req.params.id);
  res.json(deletedInterview);
});

module.exports = router;
