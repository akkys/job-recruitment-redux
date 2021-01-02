const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const db = "mongodb://localhost:27017/jobRecruitmentDB";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected to SERVER."))
  .catch((err) => console.log(err));

const cmpRegRouter = require("./routes/CompanyRegRoute");
const addTeamRouter = require("./routes/TeamRoute");
const addRoleRouter = require("./routes/RoleRoute");
const interviewRouter = require("./routes/InterviewRoute");
const intTypeRouter = require("./routes/InterviewTypesRoute");
const userRoute = require("./routes/UserRoute");
const jobListRoute = require("./routes/JobListRoute");
const candidateProfileRoute = require("./routes/CandidateProfileRoute");
const candidateExperienceRoute = require("./routes/ExperienceRoute");
const candidateProjectRoute = require("./routes/ProjectRoute");
const blogsRoute = require("./routes/BlogsRoute");

app.use("/users", userRoute);
app.use("/cmpReg", cmpRegRouter);
app.use("/addTeam", addTeamRouter);
app.use("/addRole", addRoleRouter);
app.use("/interview", interviewRouter);
app.use("/intType", intTypeRouter);
app.use("/jobList", jobListRoute);
app.use("/candidate", candidateProfileRoute);
app.use("/experience", candidateExperienceRoute);
app.use("/projects", candidateProjectRoute);
app.use("/blogs", blogsRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
