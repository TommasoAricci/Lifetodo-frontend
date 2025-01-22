const express = require("express");
const router = express.Router();
const { createThought } = require("../controllers/thoughtController");
const { getThoughts } = require("../controllers/thoughtController");
const { deleteThought } = require("../controllers/thoughtController");
const { editThought } = require("../controllers/thoughtController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/thought", authenticateToken, createThought);
router.get("/thoughts", getThoughts);
router.delete("/thoughts/:id", deleteThought);
router.put("/thoughts/:id", editThought);

module.exports = router;