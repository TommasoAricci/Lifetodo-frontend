const express = require("express");
const router = express.Router();
const { addSong } = require("../controllers/songController");
const { getSongs } = require("../controllers/songController");
const { deleteSong } = require("../controllers/songController");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/newsong", authenticateToken, addSong);
router.get("/allsongs", getSongs);
router.delete("/deletesong/:id", deleteSong);

module.exports = router;
