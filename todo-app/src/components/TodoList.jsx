import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:9000/todo');
    const data = await response.json();
    setTodos(data.data);
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:9000/todo/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div>
      <Link to="/add" className="bg-blue-500 text-white p-2 mb-4 inline-block">
        Add Todo
      </Link>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Completed</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="border border-gray-300 px-4 py-2">{todo.id}</td>
              <td className="border border-gray-300 px-4 py-2">{todo.title}</td>
              <td className="border border-gray-300 px-4 py-2">{todo.description}</td>
              <td className="border border-gray-300 px-4 py-2">{todo.completed ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <Link to={`/edit/${todo.id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
