const express = require("express");
const router = express.Router();
const {createTodos} = require("../controllers/todoController");
const {getTodos} = require("../controllers/todoController");
const {deleteTodos} = require("../controllers/todoController");
const {editTodos} = require("../controllers/todoController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/todo", authenticateToken, createTodos);
router.get("/todos", getTodos);
router.delete("/todos/:id", deleteTodos);
router.put("/todos/:id", editTodos);

module.exports = router;