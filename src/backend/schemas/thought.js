const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Thought", thoughtSchema);
