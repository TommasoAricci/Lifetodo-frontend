const Todo = require("../schemas/todo");

exports.createTodos = async (req, res) => {
  try {
    const { title, items } = req.body;
    const userId = req.user.userId; // Ottieni l'ID dell'utente autenticato

    const newTodo = new Todo({
      user: userId, // Associa il todo all'utente
      title,
      items,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate("user", "fullName username") // Popola il campo user con solo fullName e username
      .exec();

    res.status(200).json(todos);
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

exports.editTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, items } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, items },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
