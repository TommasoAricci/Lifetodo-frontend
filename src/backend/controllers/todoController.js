const Todo = require("../schemas/Todo");

exports.createTodos = async (req, res) => {
  try {
      const {title, items} = req.body;
      const newTodo = new Todo({title, items});
      await newTodo.save();
      res.status(201).json(newTodo);
      console.log(newTodo);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
    console.log(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
