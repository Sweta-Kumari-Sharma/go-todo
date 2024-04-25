import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const url = "https://go-todo.onrender.com";
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(url + '/todo');
    const data = await response.json();
    setTodos(data.data);
  };

  const createTodo = async () => {
    const response = await fetch(url + '/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    });

    const data = await response.json();
    if (data.message === 'Todo created successfully') {
      fetchTodos();
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${url}/todo/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (data.message === 'Todo deleted successfully') {
      fetchTodos();
    }
  };

  const markAsComplete = async (id, isComplete) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    const response = await fetch(`${url}/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todoToUpdate.title,
        description: todoToUpdate.description,
        completed: isComplete ? true : false,
      }),
    });

    const data = await response.json();
    if (data.message === 'Todo updated successfully') {
      fetchTodos();
    }
  };

  const handleEdit = (id, currentTitle, currentDescription, currentCompleted) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
    setEditCompleted(currentCompleted);
  };

  const handleSave = async (id) => {
    const response = await fetch(`${url}/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        completed: editCompleted,
      }),
    });

    const data = await response.json();
    if (data.message === 'Todo updated successfully') {
      setEditingId(null);
      fetchTodos();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-center">Todo App</h1>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <form className="mb-4">
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              className="border p-2 w-full md:w-1/2 lg:w-1/4 mr-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="border p-2 w-full md:w-1/2 lg:w-1/4 mr-2 rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white p-2 w-full md:w-auto lg:w-auto mt-2 md:mt-0 lg:mt-0 rounded hover:bg-blue-600"
              onClick={createTodo}
            >
              Add Todo
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Completed</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos && todos?.length && todos?.map((todo) => (
                <tr key={todo.id} className="border-b">
                  <td className="text-left p-4">{todo.id}</td>
                  <td className="text-left p-4">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      todo.title
                    )}
                  </td>
                  <td className="text-left p-4">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      todo.description
                    )}
                  </td>
                  <td className="text-left p-4">
                    {editingId === todo.id ? (
                      <input
                        type="checkbox"
                        checked={editCompleted}
                        onChange={(e) => setEditCompleted(e.target.checked)}
                      />
                    ) : (
                      todo.completed ? 'Yes' : 'No'
                    )}
                  </td>
                  <td className="text-left p-4 flex flex-col md:flex-row space-y-2 md:space-y-0">
  {editingId === todo.id ? (
    <button
      className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 w-full"
      onClick={() => handleSave(todo.id)}
    >
      Save
    </button>
  ) : (
    <button
      className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 w-full"
      onClick={() => handleEdit(todo.id, todo.title, todo.description, todo.completed)}
    >
      Edit
    </button>
  )}
  <button
    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full"
    onClick={() => deleteTodo(todo.id)}
  >
    Delete
  </button>
  {!todo.completed ? (
    <button
      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 w-full md:mt-0"
      onClick={() => markAsComplete(todo.id, false)}
    >
      Mark as Complete
    </button>
  ) : (
    <button
      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 w-full md:mt-0"
      onClick={() => markAsComplete(todo.id, true)}
    >
      Mark as Incomplete
    </button>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
