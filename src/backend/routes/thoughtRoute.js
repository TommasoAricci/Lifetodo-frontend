const express = require("express");
const router = express.Router();
const { createThought } = require("../controllers/thoughtController");
const { getThoughts } = require("../controllers/thoughtController");

router.post("/thoughts", createThought);
router.get("/thoughts", getThoughts);

module.exports = router;