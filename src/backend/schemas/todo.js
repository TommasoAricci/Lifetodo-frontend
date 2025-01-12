const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    options : {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Todo", todoSchema);