import { useState, useEffect } from "react";

export default function TodoList() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEdit = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id
        ? { ...todo, title: editTitle, description: editDescription }
        : todo
    ));
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-medium text-gray-800 mb-6">Todo List</h1>

        {/* Add Todo Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm focus:outline-none focus:border-gray-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-sm resize-none focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
        </div>

        {/* Todo Cards */}
        <div className="flex flex-col gap-4">
          {todos.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">No todos yet. Add one above!</p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`border rounded-xl p-5 transition-all ${
                todo.isCompleted
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {editId === todo.id ? (
                /* Edit Mode */
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:outline-none"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm resize-none focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="border border-gray-300 text-gray-500 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">ID: {todo.id}</p>
                      <h3 className={`font-medium text-gray-800 ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
                        {todo.title}
                      </h3>
                      <p className={`text-sm mt-1 ${todo.isCompleted ? "text-gray-400" : "text-gray-600"}`}>
                        {todo.description}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      todo.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {todo.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                        todo.isCompleted
                          ? "border-gray-300 text-gray-500 hover:bg-gray-50"
                          : "border-green-300 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {todo.isCompleted ? "Undo" : "Mark Complete"}
                    </button>
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}