const Thought = require("../schemas/thought");
const User = require("../schemas/user");

exports.createThought = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;

    const newThought = new Thought({
      user: userId,
      title,
      description,
    });

    await newThought.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find()
      .populate("user", "fullName username")
      .exec();
    res.status(200).json(thoughts);
    console.log(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);
    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editThought = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
