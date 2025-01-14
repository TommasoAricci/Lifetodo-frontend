const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    items : {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Todo", todoSchema);