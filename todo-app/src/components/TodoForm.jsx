import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    const response = await fetch(`http://localhost:9000/todo/${id}`);
    const data = await response.json();
    setTitle(data.title);
    setDescription(data.description);
    setCompleted(data.completed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      title,
      description,
      completed,
    };

    let url = 'http://localhost:9000/todo';
    let method = 'POST';

    if (id) {
      url += `/${id}`;
      method = 'PUT';
    }

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    history.push('/');
  };

  return (
    <div>
      <h2 className="text-xl mb-4">{id ? 'Edit Todo' : 'Add Todo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="completed">
            Completed
          </label>
          <input
            type="checkbox"
            id="completed"
            className="mr-2"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
