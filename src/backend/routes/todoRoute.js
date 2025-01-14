const express = require("express");
const router = express.Router();
const {createTodos} = require("../controllers/todoController");
const {getTodos} = require("../controllers/todoController");
const {deleteTodos} = require("../controllers/todoController");

router.post("/todo", createTodos);
router.get("/todos", getTodos);
router.delete("/todos/:id", deleteTodos);

module.exports = router;