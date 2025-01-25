const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  refId : {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Song", songSchema);
