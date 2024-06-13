const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  }
});
module.exports = model("Task", userSchema); // in database users collection will be created
