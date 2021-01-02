const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    miniResume: { type: String, required: true },
    skills: { type: Array, default: [], required: true },
    roles: { type: Array, default: [], required: true },
    locations: { type: Array, default: [], required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("candidate", CandidateSchema);

module.exports = Candidate;
