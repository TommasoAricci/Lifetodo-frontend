/* const mongoose = require("mongoose");

const wallSchema = new mongoose.Schema({
  entries: [
      {
          doc: { type: mongoose.Schema.Types.ObjectId, refPath: "entries.type" },
          type: { type: String, required: true, enum: ["Thought", "Todo"] },
      },
  ],
});

module.exports = mongoose.model("Wall", wallSchema);
 */