const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Genera il token JWT
    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username }, // Payload
      "MySecretPassw0rd!", // Il segreto per firmare il token
      { expiresIn: "1h" } // Opzionale, per scadenza (1 ora in questo esempio)
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId); // Escludi il campo password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { fullName, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, username },
      { new: true }
    );
    res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
