const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  companyName: { type: String },
  category: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
