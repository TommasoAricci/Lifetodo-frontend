const Thought = require("../schemas/thought");

exports.createThought = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newThought = new Thought({ title, description });
        await newThought.save();
        res.status(201).json(newThought);
        console.log(newThought);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
        console.log(thoughts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};