const Todo = require("../schemas/todo");

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
        console.log(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};