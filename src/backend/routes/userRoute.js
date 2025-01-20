const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const { loginUser } = require("../controllers/userController");
const { logoutUser } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { getCurrentUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/currentuser", authenticateToken, getCurrentUser);
router.put("/update", authenticateToken, updateUser);

module.exports = router;