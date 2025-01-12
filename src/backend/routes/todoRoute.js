const express = require("express");
const router = express.Router();
const {getTodos} = require("../controllers/todoController");

router.get("/todos", getTodos);

module.exports = router;